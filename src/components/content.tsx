import Image from 'next/image';
import profilePhoto from '../../public/profile.jpeg';

export default function Content() {
  return (
    <>
      <div className="body-container flex justify-center">
        <div className="content-container flex flex-row">
          <div className="profile-photo">
            <Image src={profilePhoto} alt='Profile-Photo' width={100} height={100} />
          </div>

          <div className="repo-details flex flex-col">
            <div className="repo-name">
              <h2>gittok</h2>
            </div>
            <div className="username">
              <p><span>by </span>msk-saad</p>
            </div>

          </div>
        </div>

        <div className="stats-container">

        </div>

        <div className="footer-container">
          <div className="star-repo">

          </div>

          <div className="share-button">

          </div>
        </div>
      </div>
    </>
  );
}