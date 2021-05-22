import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          //   avatar={user.name[0]}
          //   title={user.name}
          avatar={<Avatar>A</Avatar>}
          title="Andra Simion"

          //   description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth && auth.user && (
        <>
          <div>Pending balance</div>
          <div>Payout settings</div>
        </>
      )}
    </div>
  );
};

export default ConnectNav;
