import { useState } from 'react';
import AdminDashBoardUsersPage from "../components/adminDashBordUsersComponent/adminDashBordUsersComponent";
import AdminDashBoardCategoriesPage from "../components/adminDashBordCategoriesComponent/adminDashBordCategoriesComponent";
import AdminDashBoardSubCategoriesPage from "../components/adminDashBordSubCategoriesComponent/adminDashBordSubCategoriesComponent";
import AdminDashBoardProductsPage from "../components/adminDashBordProductsComponent/adminDashBordProductsComponent";
import AdminDashBoardOrdersPage from "../components/adminDashBordOrdersComponent/adminDashBordOrdersComponent";

export default function AdminDashBoardPage() {

    const [selectField, setSelectField] = useState(1);

    function swichState() {
        switch (selectField) {
            case 1: {
                return <AdminDashBoardUsersPage />
            }
                break;
            case 2: {
                return <AdminDashBoardCategoriesPage />
            }
                break;
            case 3: {
                return <AdminDashBoardSubCategoriesPage />
            }
                break;
            case 4: {
                return <AdminDashBoardProductsPage />
            }
                break;
            case 5: {
                return <AdminDashBoardOrdersPage />
            }
                break;
            default:
                return <AdminDashBoardUsersPage />
        }
    }

    return (
        <div className='container'>
            <div className='row m-5 col-12'>
                <div className='col-2'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className='text-hover-red' onClick={() => setSelectField(1)}>Users</th>
                            </tr>
                            <tr>
                                <th scope="col" className='text-hover-red' onClick={() => setSelectField(2)}>Categories</th>
                            </tr>
                            <tr>
                                <th scope="col" className='text-hover-red' onClick={() => setSelectField(3)}>Sub Categories</th>
                            </tr>
                            <tr>
                                <th scope="col" className='text-hover-red' onClick={() => setSelectField(4)}>Products</th>
                            </tr>
                            <tr>
                                <th scope="col" className='text-hover-red' onClick={() => setSelectField(5)}>Orders</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='col-9'>
                    {swichState()}
                </div>
            </div>
        </div>
    );
}
