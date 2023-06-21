import { Carousel } from "antd";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaCashRegister } from "react-icons/fa";

const contentStyle = {
  height: "160px",
  color: "#ffd500",
  textAlign: "center",
  background: "#fff9c4",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const Vitrin = ({ tahsil, odenecek, kasa }) => (
  <Carousel autoplay effect="fade">
    <div>
      <h3 className="vitrin1" style={contentStyle}>
        <GiReceiveMoney size={"3em"} />
        Tahsil edilecek toplam tutar: {tahsil}₺
      </h3>
    </div>
    <div>
      <h3 className="vitrin2" style={contentStyle}>
        <GiPayMoney size={"3em"} />
        Ödenecek toplam tutar: {odenecek}₺
      </h3>
    </div>
    <div>
      <h3 className="vitrin3" style={contentStyle}>
        <FaCashRegister size={"3em"} />
        Güncel Kasa Durumu: {kasa}₺
      </h3>
    </div>
  </Carousel>
);
export default Vitrin;
