import { Card, Col, Row } from "antd";

const SakinBilgi = (props) => {
  console.log(props.aidat);

  const odenmemisBorclar = () => {
    let borc = 0;
    for (let i = 0; i < props.aidat.length; i++) {
      if (!props.aidat[i].odeme) {
        borc += props.aidat[i].tutar;
      }
    }
    return borc;
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Ödenmemiş Borçlar" bordered={false}>
          {odenmemisBorclar()}₺
        </Card>
      </Col>
    </Row>
  );
};

export default SakinBilgi;
