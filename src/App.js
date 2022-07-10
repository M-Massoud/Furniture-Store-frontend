// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Leftimg from './components/Leftimg';
import Rightimg from './components/Rightimg';
import NavBar from './components/Navbar';
import ItemImg from './components/ItemIgg';
import CardComponent from './components/cardComponent/cardComponent';
function App() {
  return (
    <>
      <div className="container-fluid  bg-light">
        <div className="col-sm-11 m-auto  row">
          <h2 className=" mt-3 py-3 hgi "> Shop our sets</h2>
          <div className="col-md-4   p-2 d-flex align-items-md-center justify-content-center  ">
            {' '}
            <Leftimg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/wysiwyg/luna-1_jpg.webp'
              }
              alt={'Bedroom'}
              title={'Bedroom'}
              class={'rounded-4 col-12 shadow imghover rotatimg  '}
              name={'Beding room'}
            />
          </div>
          <div className="col-md-8  p-md-3 py-2  d-flex flex-wrap justify-content-md-evenly justify-content-between">
            <Rightimg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/wysiwyg/Living_jpg.webp'
              }
              alt={'Living room'}
              title={'Living room'}
              class={'rounded-4 col-12  imghover rotatimg'}
              name={'Living room'}
              divclass={'  col-md-5 col-6  p-2 p-sm-3 p-md-0 rounded-4  '}
            />
            <Rightimg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/wysiwyg/Dining_jpg.webp'
              }
              alt={'Dining room'}
              title={'Dining room'}
              class={'rounded-4 col-12  imghover rotatimg'}
              name={'Dining room'}
              divclass={
                '  col-md-5 col-6  p-2 p-sm-3 p-md-0   offset-md-1 rounded-4  '
              }
            />
            <Rightimg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/wysiwyg/Outdoor_1__jpg.webp'
              }
              alt={'Garden furniture'}
              title={'Garden furniture'}
              class={'rounded-4 col-12  imghover rotatimg'}
              name={'Garden furniture'}
              divclass={'  col-md-5 col-6  p-2 p-sm-3 p-md-0 rounded-4 '}
            />
            <Rightimg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/wysiwyg/Kitchen_jpg.webp'
              }
              alt={'Kitchens'}
              title={'Kitchens'}
              class={'rounded-4 col-12  imghover rotatimg'}
              name={'Kitchens'}
              divclass={
                '  col-md-5 col-6  p-2 p-sm-3 p-md-0 offset-md-1 rounded-4 '
              }
            />
          </div>
          <hr className="mt-4"></hr>
          <h2 className=" mt-3 py-3 hgi "> Shop by item</h2>
          <NavBar
            living={'Living Room'}
            Bed={'Bedroom'}
            Dining={'Dining Room'}
            Gard={'Garden Furniture'}
          />
          <div className="row  m-auto  " id="item1">
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_9841_jpg.webp'
              }
              alt={'Coffee table'}
              title={'Coffee table'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Coffee table'}
              divclass={' col-6  col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/side-table_jpg.webp'
              }
              alt={'Side table'}
              title={'Side table'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Side table'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/ae-601-3_png.webp'
              }
              alt={'Sofa 3 Seaters'}
              title={'Sofa 3 Seaters'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Sofa 3 Seaters'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/resized/263x270/ae-60xx-1.jpeg'
              }
              alt={'Chair'}
              title={'Chair'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Chair'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
          </div>
          <div className="row  m-auto d-none " id="item2">
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_6697_copy_1_png.webp'
              }
              alt={'King Bed'}
              title={'King Bed'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'King Bed'}
              divclass={' col-6  col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/8x0b6988_edit_jpg.webp'
              }
              alt={'Queen Bed'}
              title={'Queen Bed'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Queen Bed'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_0608-edit_1_png.webp'
              }
              alt={'Dresser'}
              title={'Dresser'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Dresser'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_9461_jpg.webp'
              }
              alt={'Wordrobe'}
              title={'Wordrobe'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Wordrobe'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
          </div>
          <div className="row  m-auto d-none " id="item3">
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_9580_jpg.webp'
              }
              alt={'Dining Table'}
              title={'Dining Table'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Dining Table'}
              divclass={' col-6  col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/ae-d53-3_png.webp'
              }
              alt={'Dining Bench'}
              title={'Dining Bench'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Dining Bench'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_6798_copy_1_jpg.webp'
              }
              alt={'Display Unit'}
              title={'Display Unit'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Display Unit'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_9594_jpg.webp'
              }
              alt={'Buffet'}
              title={'Buffet'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Buffet'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
          </div>
          <div className="row  m-auto d-none " id="item4">
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/go-023_jpg.webp'
              }
              alt={'Outdoor Sofa set'}
              title={'Outdoor Sofa set'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Outdoor Sofa set'}
              divclass={' col-6  col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_9080_jpg.webp'
              }
              alt={'Hammock'}
              title={'Hammock'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Hammock'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/amasty/webp/resized/263x270/img_0831_1_jpg.webp'
              }
              alt={'Relax Chair'}
              title={'Relax Chair'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Relax Chair'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
            <ItemImg
              src={
                'https://d13r0hznkpv24o.cloudfront.net/media/resized/263x270/img_7179_1.jpg'
              }
              alt={'Swings'}
              title={'Swings'}
              class={'rounded-4 col-12 shadow border imgItem '}
              name={'Swings'}
              divclass={'col-6 col-md-3  pt-4  '}
            />
          </div>
          <hr className="mt-4"></hr>
        </div>
      </div>

      <CardComponent />
    </>
  );
}

export default App;
