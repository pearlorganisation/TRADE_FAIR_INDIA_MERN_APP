import React, { useEffect, useState } from "react";
import EventBanner from "../../components/assets/BannerTFI.avif";
import OLogo from "../../components/assets/OLogo.png";
import PdfIcon from '../../components/assets/pdf.png'
import { RiMapPinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiTimerLine } from "react-icons/ri";
import { MdFileDownload } from "react-icons/md";
import Location from "../../components/GoogleMap/Location";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getEventByUniqueKey } from "../../features/actions/eventAction";
import FullPageLoader from "../../components/common/FullPageLoader";

const Event = () => {
  const {eventUniqueKey} = useParams()
  const { eventData,isLoading } = useSelector(state => state.event)
  const [value, setValue] = useState({})
  const [formattedDate, setFormattedDate] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEventByUniqueKey(eventUniqueKey))
  }, [])

  

  useEffect(() => {
    const formattedDates = eventData?.eventDate?.map(dateString => {
      const date = new Date(dateString);
      return {date:date.toLocaleString('en-US', { timeZone: 'UTC' })};
    });
    setFormattedDate(formattedDates)
  }, [eventData])
  
  console.log(Array.isArray(formattedDate) && formattedDate?.length > 0 && formattedDate[0]?.date)
  console.log("location::",eventData?.venue?.GeoLocation?.latLng?.lat

  )
  
  return (
   <div className="relative min-h-screen ">
    {
      isLoading ? <FullPageLoader/> :  <div className="container mx-auto p-2 rounded-md overflow-hidden">
      <div>
        <img style={{width:'100%',height:'26rem',aspectRatio:2/1,objectFit:'cover',objectPosition:'top center'}} src={eventData?.eventBanner?.path || EventBanner} />
        <div className="grid md:w-[80%] mx-auto md:grid-cols-[auto_70%] place-items-start md:place-items-center md:translate-y-[-4.5rem] p-3">
          <div className="bg-slate-800 w-[8rem] lg:h-[12rem] h-[8rem] lg:w-[12rem] rounded-full p-1">
            <div className="h-full w-full border-2 rounded-full text-center grid place-items-center text-white overflow-hidden">
             <img className="rounded-full object-center" src={eventData?.eventLogo?.path}/>
            </div>
          </div>
          <div className="text-2xl md:text-3xl lg:text-5xl md:translate-y-5 font-medium md:font-semibold">
          Event Name :  {eventData?.eventName}
          </div>
        </div>
      </div>
      <div className="md:w-[70%] mx-auto space-y-3 ">
        <div className="bg-white font-medium md:font-semibold text-slate-700 space-y-4 rounded-md px-5 py-6 text-sm md:text-base">
          <div className="flex justify-start items-center gap-2">
            <RiMapPinLine size={20} />
            <span className="">
             {eventData?.venue?.Address}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-start items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <span className="flex justify-start items-center gap-2">
              <FaRegCalendarAlt size={20} /> {Array.isArray(formattedDate) && formattedDate?.length > 0 && formattedDate[0]?.date}
            </span>{" "}
            <span className="flex justify-start items-center gap-2">
              <RiTimerLine size={20} />
              03:00 PM TO 100:00 PM
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">About The Event</div>
          <div className="text-slate-700 font-medium">
            {
              eventData?.description

            }
          </div>
        </div>



        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">Why You Should Attend :</div>
          <div className="text-slate-700 font-medium">
           <ul className="list-disc pl-5">
            {
              eventData?.attendReason?.split('.')?.filter( item => item != '')?.map(item => {
                return  <li> {item}</li>
              })
            }
           </ul>
          </div>
        </div>


        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">Terms & Conditions :</div>
          <div className="text-slate-700 font-medium">
          {
              eventData?.termsConditions?.split('.')?.filter( item => item != '')?.map(item => {
                return  <li> {item}</li>
              })
            }
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">Rules & Regulations :</div>
          <div className="text-slate-700 font-medium">
          <ul className="list-disc pl-5">
          {
              eventData?.rules?.split('.')?.filter( item => item != '')?.map(item => {
                return  <li> {item}</li>
              })
            }
           </ul>
          </div>
        </div>


        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">Brochures :</div>
          <div className="text-slate-700 font-medium space-y-1">
          <span className="p-1">Tap To Download</span>
         <div className="flex justify-start items-center">
         {
            Array(4).fill(true).map(item =>{
                return <div className="relative group cursor-pointer">
                    <div className="overflow-hidden transition-all w-full h-[0%] group-hover:h-[100%] bg-white/30 absolute grid place-items-center"><MdFileDownload className="text-black/70" size={40} /></div>
                    <img className="" height={70} width={70} src={PdfIcon}/>
                </div>
            })
          }
         </div>
          </div>
        </div>


        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">Location :</div>
          <div className="text-slate-700 font-medium">
          <Location lat={eventData?.venue?.GeoLocation?.latLng?.lat} lng={eventData?.venue?.GeoLocation?.latLng?.lng} setValue={setValue} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-teal-600 font-semibold py-2 border-b-2 border-[#0D948B]">Organiser :</div>
          <div className="text-slate-700 font-medium flex gap-3">
           <div className="rounded-full overflow-hidden w-fit"><img height={100} width={100}  src={OLogo}/></div>
           <div className="grid">
            <span className="font-medium text-2xl md:text-3xl">{eventData?.organiser[0]?.companyName}</span>
            <span className="text-lg md:text-xl">12+ Events Done In Past</span>
            <span className="text-lg md:text-xl">0987654321</span>
           </div>
          </div>
        </div>

      </div>
    </div>
    }
    
   </div>
  );
};

export default Event;
