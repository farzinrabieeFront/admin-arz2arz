import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { IoChevronDown, TiChevronLeft, AiOutlineHistory, RiExchangeFundsFill } from "react-icons/all";
//components
import { oscillationServices } from "../../../services";
import CustomizedTable from "../../../components/table/Table";
import CustomizedInput, { amountFilter } from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedBadge from "../../../components/badge/Badge";
import Styles from './Setting.module.scss'
import DateConvert from '../../../utils/date';
import { useTheme, useTitle } from "../../../context";
import ActivitiesPage from "../../activities/Activities";
import NoData from "../../../components/no-data/NoData";
import { oscillationValidator } from "../../../utils/validators";

export default function ExchangeSettingPage() {
    document.title = "ارز تو ارز | تنظیمات صرافی";
    


    return (
        <div className="mt-4 d-flex flex-wrap justify-content-center">
            {/* <div className=" col-12 p-4 border-radius-lg card-shadow bg-white transition-height"> */}
            <div className="col-12 p-0">
            


                <div className={`p-4 border-radius-lg card-shadow bg-white mb-5`}>
                    <div className={`border-bottom pb-3`}

                    >
                        <h2 className="is-size-6 m-0">تنظیمات فعالیت صرافی</h2>
                    </div>

                    <div className="pt-4">

              
                    </div>

                </div>
            </div>


        </div>
    );
}
