import { Divider, List, Typography } from "antd";
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const SakinDuyurular = () => (
  <>
    <Divider orientation="left">Duyurular</Divider>
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </>
);
export default SakinDuyurular;
