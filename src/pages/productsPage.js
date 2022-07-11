import CardComponent from '../components/cardComponent/cardComponent';
import SidebarComponent from '../components/sidebarComponent/sidebarComponent';
export default function ProductsPage() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 col-md-3 col-lg-2">
            <SidebarComponent />
          </div>
          <div className="col col-sm-8 col-md-9 col-lg-10">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  g-4 ">
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
