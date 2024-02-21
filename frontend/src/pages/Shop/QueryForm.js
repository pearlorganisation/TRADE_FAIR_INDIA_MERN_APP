import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postEnquiry } from "../../features/actions/enquiryAction";
import { useParams } from "react-router";

const QueryForm = () => {
  const dispatch = useDispatch();
  const { shopId } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(postEnquiry({ payload: data, shopId: shopId }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Component: Rounded large input with helper text  */}
      <div className="flex flex-wrap items-end gap-3">
        <div class="relative my-6 flex-grow basis-[550px]">
          <input
            id="id-l03"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            class="relative w-full h-12 px-4 placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <label
            for="id-l03"
            class="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Name
          </label>
          {errors.name && (
            <div className="absolute top-[1rem] right-[0.5rem] text-sm text-red-400">
              This field is required
            </div>
          )}
        </div>
        <div class="relative my-6 flex-grow basis-[550px]">
          <input
            {...register("number", { required: true })}
            id="id-l03"
            type="text"
            placeholder="Contact Number"
            class="relative w-full h-12 px-4 placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <label
            for="id-l03"
            class="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Contact Number
          </label>
          {errors.number && (
            <div className="absolute top-[1rem] right-[0.5rem] text-sm text-red-400">
              This field is required
            </div>
          )}
        </div>

        <div class=" my-6 flex-grow basis-[550px] relative">
          <input
            {...register("email", { required: true })}
            id="id-l03"
            type="text"
            placeholder="Email"
            class="relative w-full h-12 px-4 placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <label
            for="id-l03"
            class="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Email
          </label>
          {errors.email && (
            <div className="absolute top-[1rem] right-[0.5rem] text-sm text-red-400">
              This field is required
            </div>
          )}
        </div>

        <div class=" my-6 flex-grow basis-[550px] relative">
          <input
            {...register("state", { required: true })}
            id="id-l03"
            type="text"
            placeholder="City/State"
            class="relative w-full h-12 px-4 placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <label
            for="id-l03"
            class="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            City/State
          </label>
          {errors.city_state && (
            <div className="absolute top-[1rem] right-[0.5rem] text-sm text-red-400">
              This field is required
            </div>
          )}
        </div>

        <div class="relative my-6 w-full">
          <textarea
            {...register("query", { required: true })}
            cols="30"
            rows="10"
            id="id-l03"
            placeholder="Would love to hear something from you...."
            class="relative w-full resize-none px-4 placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <label
            for="id-l03"
            class="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Would love to hear something from you....
          </label>
          {errors.query && (
            <div className="absolute top-[1rem] right-[0.5rem] text-sm text-red-400">
              This field is required
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          className="px-12 py-2 w-full sm:w-auto rounded-3xl active:scale-95 hover:ring-4 ring-[#00373E]/30 transition-all bg-[#00373E] text-white"
          type="submit"
        >
          Send
        </button>
      </div>

      {/* End Rounded large input with helper text */}
    </form>
  );
};

export default QueryForm;
