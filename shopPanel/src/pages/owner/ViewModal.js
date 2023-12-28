import React, { useEffect } from "react";
import jsPDF from "jspdf";
import { useState } from "react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import {BiDownload} from 'react-icons/bi'
import { QRCodeCanvas } from "qrcode.react";

const ViewModal = ({ onClose, shopInfo,setEnquiry }) => {
  const pdfRef = useRef();

  

  const generatePdf = async () => {
    // Specify 'mm' and 'a4' for better print quality
    const pdf = new jsPDF("p", "mm", "a4");

    // Increase the DPI (dots per inch) for higher image resolution

    // You can adjust this value as needed
    const dpi = 900;
    // 96 DPI is the default screen resolution
    const scale = dpi / 96;

    // Capture the HTML content as an image using html2canvas
    const canvas = await html2canvas(pdfRef.current, { scale: scale });

    // Convert the canvas to a data URL
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Add the image to the PDF
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );

    // Save the PDF
    pdf.save(`${shopInfo.shopName}.pdf`);
  };

  useEffect(() => {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "auto";
      }
    };
  }, []);


   // Download QR Code Functionality - Start

   const qrRef = useRef();

   const downloadQRCode = (e) => {
     e.preventDefault();
     let canvas = qrRef.current.querySelector("canvas");
     let image = canvas.toDataURL("image/png");
     let anchor = document.createElement("a");
     anchor.href = image;
     anchor.download = `shop-qr-code.png`;
     document.body.appendChild(anchor);
     anchor.click();
     document.body.removeChild(anchor);
   };
 
   const qrcode = (
     <QRCodeCanvas
       id="qrCode"
       value={shopInfo?.shopUrl ? shopInfo?.shopUrl : ""}
       size={250}
       bgColor="white"
     />
   );
   // Download QR Code Functionality - finish
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-slate-300/20 backdrop-blur-sm">
     
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-md shadow-lg border-2">
          <div ref={pdfRef}>
            <div className="font-medium text-gray-800 text-xl  sm:text-2xl text-center py-2 relative">Trade Fair India
            <button
                className="py-2 px-4 text-gray-400 rounded-md hover:bg-gray-100 float-right top-0 bottom-0 absolute right-0"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center p-4 border-y">
              <h4 className="text-lg font-medium text-gray-800 ">
               Shop Detail
              </h4>
             
            </div>
            <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500 ">
              <div className=" shadow-sm border rounded-lg overflow-x-auto p-3">
                <>
                <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Shop Id</div>
                    <div> {shopInfo?._id}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Shop Name</div>
                    <div> {shopInfo?.shopName}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Email</div>
                    <div> {shopInfo?.emailAddress}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Primary Phone Number</div>
                    <div> {shopInfo?.primaryPhoneNumber}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Whatsapp Number</div>
                    <div> {shopInfo?.whatsappNo}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Secondry Phone Number</div>
                    <div> {shopInfo?.secondaryPhoneNumber}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">About us</div>
                    <div> {shopInfo?.aboutUs}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Bio</div>
                    <div> {shopInfo?.bio}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">State</div>
                    <div> {shopInfo?.state}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">City</div>
                    <div> {shopInfo?.city}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Dynamic Shop Url</div>
                    <div className="text-blue-600"> <a href={shopInfo?.shopUrl} target="_blank">{shopInfo?.shopUrl || "N.A"}</a> </div>
                  </div>

                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium"> Shop's QR Code</div>
                    <div className="text-blue-600"> <div ref={qrRef}>{qrcode}</div>
                        <form onSubmit={downloadQRCode}>
                          <button
                            className="flex justify-center items-center gap-3 px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm mt-2"
                            type="submit"
                            disabled={!shopInfo?.shopUrl}
                          >
                            Download Shop's QR code
                          </button>
                        </form> </div>
                  </div>
                
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Website url</div>
                    <div> {shopInfo?.websiteUrl}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Shop Address</div>
                    <div> {shopInfo?.shopAddress}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Shop Logo</div>
                    <div> <img width={50} height={50} src={shopInfo?.logo?.path}/></div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Stall No.</div>
                    <div> {shopInfo?.stallNo}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Hall No.</div>
                    <div> {shopInfo?.hallNo}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Instagram url</div>
                    <div> {shopInfo?.instagramUrl}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">LinkedIn url</div>
                    <div> {shopInfo?.linkedInUrl}</div>
                  </div>

                 

                  <div className="grid grid-cols-2 p-2">
                    <div className="font-medium">Search Keywords</div>
                    <div>
                    {Array.isArray(shopInfo?.searchKeywords) &&
                      shopInfo?.searchKeywords.map((item, index) => {
                        return (
                          <div>
                            {" "}
                            {item}
                            {shopInfo?.searchKeywords.length > index + 1
                              ? ","
                              : ""}
                          </div>
                        );
                      })}
                    </div>
                    
                  </div>
                  <div className="grid grid-cols-1 p-2">
                    <div className="font-medium text-2xl py-4 border-t-2 text-center">Shop Documents</div>
                    <div className="space-y-2 grid place-items-center">  {Array.isArray(shopInfo?.pdfList) && shopInfo?.pdfList?.length > 0 ? (
                      shopInfo?.pdfList?.map((pdf, i) => {
                        return (
                          <div className="border-2 rounded-lg" key={i}>
                            <embed
                              src={pdf?.path || "N.A"}
                              width="400"
                              height="400"
                              className="m-3"
                              title={pdf?.originalname}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <>N.A</>
                    )}</div>
                  </div>
                  <div>
                    <section className="py-14">
                      <div className=" border-t-2 px-4 text-center text-gray-600 md:px-8">
                        <div className="max-w-2xl mx-auto pt-6">
                          <h3 className="text-gray-800 text-3xl font-bold sm:text-5xl">
                            Enquiry Data of shop
                          </h3>
                        </div>
                        <div className="mt-12">
                          <div className="text-left pb-2 font-bold">Total Enquiries : {shopInfo?.enquiries.length}</div>
                          {Array.isArray(shopInfo?.enquiries) &&
                          shopInfo?.enquiries.length > 0 ? (
                            <ul className="space-y-4 overflow-x-auto">
                              {shopInfo?.enquiries.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="space-y-3 divide-y-2 border-2 p-2 rounded-md border-indigo-600/10 "
                                >
                                  <div className="p-2">
                                    <div className="font-bold">Enquiry {idx+1}</div>
                                   
                                  </div>
                                  <div className="grid grid-cols-2 p-2">
                                    <div className="font-medium">Name</div>
                                    <div>
                                      {" "}
                                      {item?.name || (
                                        <span className="font-bold">N.A</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 p-2">
                                    <div className="font-medium">Email</div>
                                    <div>
                                      {" "}
                                      {item?.email || (
                                        <span className="font-bold">N.A</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 p-2">
                                    <div className="font-medium">Number</div>
                                    <div>
                                      {" "}
                                      {item?.number || (
                                        <span className="font-bold">N.A</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 p-2">
                                    <div className="font-medium line">Query</div>
                                    <div className="line-clamp-1">
                                      {" "}
                                      {item?.query || (
                                        <span className="font-bold">N.A</span>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="font-bold text-lg">
                              No Data Found
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4  border-t">
            <div className="mt-3 md:mt-0">
              <button
                  onClick={generatePdf}

                type="button"
                className="flex justify-center items-center gap-3 px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Download{" "}
               <BiDownload size={20}/>
              </button>
            </div>
            <div className="mt-3 md:mt-0">
              <button
                onClick={() => {
                  onClose();
                  setEnquiry(true);
                }}
                type="button"
                className="flex justify-center items-center gap-3 px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Enquiry{" "}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
