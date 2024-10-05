import Image from "next/image";

const Profile = () => {
  return (
    <div className="card relative mt-12 md:mr-10 dark:bg-gray-500 dark:text-white">
      <div className="circle dark:bg-gray-700" />
      <div className="circle dark:bg-gray-700" />
      <div className="card-inner dark:bg-gray-600" />
      <Image
        src="/images/profile.jpg"
        alt="Profile Picture"
        height={255}
        width={170}
        className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg"
      />
    </div>
  );
};

export default Profile;
