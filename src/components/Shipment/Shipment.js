import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const onSubmit = (data) => console.log(data);
    
    return (
        <form className="inventoryForm" onSubmit={handleSubmit(onSubmit)}>
        <input value={loggedInUser.name} {...register("name", { required: true })} placeholder="Enter Your Name"/>
        {errors.name?.type === "required" && "name is required"} <br /><br />
  
        <input value={loggedInUser.email} {...register("email", { required: true })} placeholder="Enter Your Email"/>
        {errors.email && <span>This field is required</span>} <br /> <br />

        <input {...register("address", { required: true })} placeholder="Enter Your Address"/>
        {errors.address && <span>This field is required</span>} <br /><br />
  
        <input {...register("phoneNo", { required: true })} placeholder="Enter Your Phone No"/>
        {errors.phoneNo && <span>This field is required</span>} <br /><br />
  
        <input type="submit" />
      </form>
    );
};

export default Shipment;