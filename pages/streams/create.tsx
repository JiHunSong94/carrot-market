import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

export default function Create() {
  return (
    <Layout canGoBack title="Go Live">
      <form className="space-y-4 py-10 px-4">
        <Input label="Name" name="name" type="text" required />
        <Input
          label="Price"
          name="price"
          kind="price"
          type="text"
          placeholder="0.00"
          required
        />
        <TextArea label="Description" name="description" />
        <Button text="Go live" />
      </form>
    </Layout>
  );
}
