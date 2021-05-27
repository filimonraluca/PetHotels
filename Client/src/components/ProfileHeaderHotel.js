import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ProfileHeader = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { hotel } = auth;
  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{hotel.hotelName[0]}</Avatar>}
          title={`${hotel.hotelName}`}
          description={`Joined ${moment(hotel.createdAt).fromNow()}`}
        />
      </Card>
      <Card>
        <Meta
          title={`Romania, ${hotel.city}`}
          description={`${hotel.address}, ${hotel.phone}`}
        />
      </Card>
    </div>
  );
};

export default ProfileHeader;
