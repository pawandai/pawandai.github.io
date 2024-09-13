import Image from "next/image";

const Profile = () => {
  return (
    <div className="card relative mt-12 md:mr-10">
      <div className="circle" />
      <div className="circle" />
      <div className="card-inner" />
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
