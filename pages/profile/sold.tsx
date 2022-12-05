import Layout from "@components/layout";
import ProductList from "@components/product-list";

export default function Sold() {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col space-y-5 divide-y pb-10">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
}
