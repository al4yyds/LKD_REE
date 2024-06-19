import Booking from "../componentsJSX/Booking";
import GridPic from "../componentsJSX/GridPic";
import Introduction from "../componentsJSX/Introduction";
import ProInfo from "../componentsJSX/ProInfo";
import ProductSearchBar from "../componentsJSX/ProductSearchBar";
import Reviews from "../componentsJSX/Reviews";

const Cart = () => {
  return (
    <div>
      <Booking />

      <ProductSearchBar />
      <GridPic />
      <ProInfo />
      <Introduction />
      <Reviews />
    </div>
  );
};

export default Cart;
