import "./App.css";
import { createForm } from "@formily/core";
import { FormProvider, FormConsumer, Field } from "@formily/react";
import {
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
} from "@formily/antd";
import { Input as AntInput } from "antd";
function App() {
  const form = createForm();
  const clickEvent = () => {
    window.$wujie?.bus.$emit("getData");
  };
  return (
    <div>
      <button onClick={clickEvent}>Test Get Parent Data</button>
    </div>
  );
}

export default App;
