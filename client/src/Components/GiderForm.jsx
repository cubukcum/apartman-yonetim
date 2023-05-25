import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useState } from "react";
const GiderForm = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [loading, setLoading] = useState(false);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      labelCol={{
        span: 14,
      }}
      wrapperCol={{
        span: 20,
      }}
      layout="inline"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item required="true" label="Açıklama">
        <Input />
      </Form.Item>
      <Form.Item required="true" label="Kategori">
        <Select>
          <Select.Option value="Asansör Bakımı">Asansör Bakımı</Select.Option>
          <Select.Option value="Demirbaş">Demirbaş</Select.Option>
          <Select.Option value="Elektrik">Elektrik</Select.Option>
          <Select.Option value="Personel">Personel</Select.Option>
          <Select.Option value="Temizlik">Temizlik</Select.Option>
          <Select.Option value="Yakıt">Yakıt</Select.Option>
          <Select.Option value="Yönetim">Yönetim</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item required="true" label="Düzenleme Tarihi">
        <DatePicker />
      </Form.Item>
      <Form.Item required="true" label="Tutar">
        <InputNumber />
      </Form.Item>
      <Form.Item required="true" label="Ödendi" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Gider Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};
export default GiderForm;
