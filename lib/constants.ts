export const CODE = `#include <Arduino.h>
#include <queue>

// ============================================================
// CONFIG & COORDINATES
// ============================================================
#define N 4
enum Direction
{
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3
};
enum State
{
    EXPLORING,
    GOING_TO_GOAL,
    FINISHED
};

State robotState = EXPLORING;

int dx[4] = {0, 1, 0, -1};
int dy[4] = {1, 0, -1, 0};

int x = 0, y = 0;
int currentOrient = NORTH;

int goalX = 1;
int goalY = 1;

bool walls[N][N][4];
int distMap[N][N];
bool visited[N][N];

// ============================================================
// PINS & HARDWARE
// ============================================================
#define MOTOR_IN1 27
#define MOTOR_IN2 26
#define MOTOR_IN3 25
#define MOTOR_IN4 33
#define MOTOR_ENA 13
#define MOTOR_ENB 14
#define ENCODER_LA 34
#define ENCODER_RA 22
#define OUT_LEFT 16
#define OUT_RIGHT 17
#define TRIG_FRONT 18
#define ECHO_FRONT 19
#define TRIG_LEFT 32
#define ECHO_LEFT 4
#define TRIG_RIGHT 15
#define ECHO_RIGHT 21

#define WALL_THRESHOLD 5
const int forwardPulses = 585;

volatile int leftCount = 0;
volatile int rightCount = 0;
void IRAM_ATTR leftISR() { leftCount++; }
void IRAM_ATTR rightISR() { rightCount++; }

// ============================================================
// MOTOR & SENSOR UTILITIES
// ============================================================
void stopMotors()
{
    digitalWrite(MOTOR_IN1, LOW);
    digitalWrite(MOTOR_IN2, LOW);
    digitalWrite(MOTOR_IN3, LOW);
    digitalWrite(MOTOR_IN4, LOW);
    ledcWrite(MOTOR_ENA, 0);
    ledcWrite(MOTOR_ENB, 0);
}

void moveForward(int speed = 180)
{
    digitalWrite(MOTOR_IN1, HIGH);
    digitalWrite(MOTOR_IN2, LOW);
    digitalWrite(MOTOR_IN3, HIGH);
    digitalWrite(MOTOR_IN4, LOW);
    ledcWrite(MOTOR_ENA, speed);
    ledcWrite(MOTOR_ENB, speed);
}

void turnRight90()
{
    leftCount = rightCount = 0;
    while ((leftCount + rightCount) / 2 < 218)
    {
        digitalWrite(MOTOR_IN1, HIGH);
        digitalWrite(MOTOR_IN2, LOW);
        digitalWrite(MOTOR_IN3, LOW);
        digitalWrite(MOTOR_IN4, HIGH);
        ledcWrite(MOTOR_ENA, 160);
        ledcWrite(MOTOR_ENB, 160);
    }
    stopMotors();
    delay(200);
}

void turnLeft90()
{
    leftCount = rightCount = 0;
    while ((leftCount + rightCount) / 2 < 218)
    {
        digitalWrite(MOTOR_IN1, LOW);
        digitalWrite(MOTOR_IN2, HIGH);
        digitalWrite(MOTOR_IN3, HIGH);
        digitalWrite(MOTOR_IN4, LOW);
        ledcWrite(MOTOR_ENA, 160);
        ledcWrite(MOTOR_ENB, 160);
    }
    stopMotors();
    delay(200);
}

float getDistance(int trig, int echo)
{
    digitalWrite(trig, LOW);
    delayMicroseconds(2);
    digitalWrite(trig, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig, LOW);
    long duration = pulseIn(echo, HIGH, 15000);
    return (duration == 0) ? 100.0 : duration * 0.034 / 2.0;
}

// ============================================================
// MAPPING & FLOOD FILL
// ============================================================
void addWall(int cx, int cy, int dir)
{
    if (cx < 0 || cy < 0 || cx >= N || cy >= N)
        return;
    walls[cx][cy][dir] = true;
    int nx = cx + dx[dir];
    int ny = cy + dy[dir];
    if (nx >= 0 && ny >= 0 && nx < N && ny < N)
        walls[nx][ny][(dir + 2) % 4] = true;
}

void detectWalls()
{
    if (getDistance(TRIG_FRONT, ECHO_FRONT) < WALL_THRESHOLD)
        addWall(x, y, currentOrient);
    if (getDistance(TRIG_LEFT, ECHO_LEFT) < WALL_THRESHOLD)
        addWall(x, y, (currentOrient + 3) % 4);
    if (getDistance(TRIG_RIGHT, ECHO_RIGHT) < WALL_THRESHOLD)
        addWall(x, y, (currentOrient + 1) % 4);
}

void updateDistances(int gx, int gy)
{
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            distMap[i][j] = 255;
    std::queue<std::pair<int, int>> q;
    distMap[gx][gy] = 0;
    q.push({gx, gy});

    while (!q.empty())
    {
        auto curr = q.front();
        q.pop();
        for (int d = 0; d < 4; d++)
        {
            if (walls[curr.first][curr.second][d])
                continue;
            int nx = curr.first + dx[d];
            int ny = curr.second + dy[d];
            if (nx >= 0 && ny >= 0 && nx < N && ny < N && distMap[nx][ny] == 255)
            {
                distMap[nx][ny] = distMap[curr.first][curr.second] + 1;
                q.push({nx, ny});
            }
        }
    }
}

// ============================================================
// MOVEMENT EXECUTION
// ============================================================
void moveOneCell()
{
    leftCount = rightCount = 0;
    while (true)
    {
        int irL = digitalRead(OUT_LEFT);
        int irR = digitalRead(OUT_RIGHT);

        if (irL == 0 && irR == 0)
            moveForward();
        else if (irL == 1)
        { // Correct Left
            digitalWrite(MOTOR_IN1, LOW);
            digitalWrite(MOTOR_IN3, HIGH);
            ledcWrite(MOTOR_ENA, 130);
            ledcWrite(MOTOR_ENB, 130);
        }
        else if (irR == 1)
        { // Correct Right
            digitalWrite(MOTOR_IN1, HIGH);
            digitalWrite(MOTOR_IN2, LOW); // Note: Simple correction
            ledcWrite(MOTOR_ENA, 130);
            ledcWrite(MOTOR_ENB, 130);
        }

        if (getDistance(TRIG_FRONT, ECHO_FRONT) < 5.5 || (leftCount >= forwardPulses))
        {
            stopMotors();
            delay(150);
            break;
        }
    }
}

void faceDirection(int target)
{
    if (target == currentOrient)
        return;
    int diff = (target - currentOrient + 4) % 4;
    if (diff == 1)
        turnRight90();
    else if (diff == 3)
        turnLeft90();
    else if (diff == 2)
    {
        turnRight90();
        turnRight90();
    }
    currentOrient = target;
}

// ============================================================
// CORE NAVIGATION ENGINE
// ============================================================
void navigateStep(int targetX, int targetY)
{
    updateDistances(targetX, targetY);

    int bestDir = -1;
    int minVal = 255;

    // PRIORITY: Straight path
    if (!walls[x][y][currentOrient])
    {
        int nx = x + dx[currentOrient];
        int ny = y + dy[currentOrient];
        if (nx >= 0 && nx < N && ny >= 0 && ny < N && distMap[nx][ny] < distMap[x][y])
        {
            bestDir = currentOrient;
            minVal = distMap[nx][ny];
        }
    }

    // SECONDARY: Check all other valid neighbors
    if (bestDir == -1)
    {
        for (int d = 0; d < 4; d++)
        {
            if (!walls[x][y][d])
            {
                int nx = x + dx[d];
                int ny = y + dy[d];
                if (nx >= 0 && nx < N && ny >= 0 && ny < N && distMap[nx][ny] < minVal)
                {
                    minVal = distMap[nx][ny];
                    bestDir = d;
                }
            }
        }
    }

    if (bestDir != -1)
    {
        faceDirection(bestDir);
        moveOneCell();
        x += dx[currentOrient];
        y += dy[currentOrient];
    }
}

// ============================================================
// MAIN SETUP & LOOP
// ============================================================
void setup()
{
    Serial.begin(115200);
    pinMode(MOTOR_IN1, OUTPUT);
    pinMode(MOTOR_IN2, OUTPUT);
    pinMode(MOTOR_IN3, OUTPUT);
    pinMode(MOTOR_IN4, OUTPUT);
    pinMode(OUT_LEFT, INPUT);
    pinMode(OUT_RIGHT, INPUT);
    pinMode(TRIG_FRONT, OUTPUT);
    pinMode(ECHO_FRONT, INPUT);
    pinMode(TRIG_LEFT, OUTPUT);
    pinMode(ECHO_LEFT, INPUT);
    pinMode(TRIG_RIGHT, OUTPUT);
    pinMode(ECHO_RIGHT, INPUT);

    attachInterrupt(digitalPinToInterrupt(ENCODER_LA), leftISR, RISING);
    attachInterrupt(digitalPinToInterrupt(ENCODER_RA), rightISR, RISING);
    ledcAttach(MOTOR_ENA, 5000, 8);
    ledcAttach(MOTOR_ENB, 5000, 8);

    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            visited[i][j] = false;

    // Boundary Setup
    for (int i = 0; i < N; i++)
    {
        addWall(i, 0, SOUTH);
        addWall(i, N - 1, NORTH);
        addWall(0, i, WEST);
        addWall(N - 1, i, EAST);
    }
}

void loop()
{
    if (robotState == EXPLORING)
    {
        visited[x][y] = true;
        detectWalls();

        // Find nearest unvisited cell
        int nextX = -1, nextY = -1;
        int minSteps = 255;
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (!visited[i][j])
                {
                    updateDistances(i, j);
                    if (distMap[x][y] < minSteps)
                    {
                        minSteps = distMap[x][y];
                        nextX = i;
                        nextY = j;
                    }
                }
            }
        }

        if (nextX != -1)
        {
            navigateStep(nextX, nextY);
        }
        else
        {
            Serial.println("EXPLORATION COMPLETE. RETURNING TO (0,0) BEFORE FAST RUN.");
            robotState = GOING_TO_GOAL;
        }
    }
    else if (robotState == GOING_TO_GOAL)
    {
        if (x == goalX && y == goalY)
        {
            Serial.println("GOAL REACHED!");
            robotState = FINISHED;
        }
        else
        {
            navigateStep(goalX, goalY);
        }
    }
    else
    {
        stopMotors();
    }
}`;