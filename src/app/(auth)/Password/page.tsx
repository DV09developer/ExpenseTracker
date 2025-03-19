"use client"
// Use component with upper caase 
import Password from '../../Components/Password' ;
import Logo from '@/app/Components/logo';
import { useRouter } from 'next/navigation';
import pb from '../../../../pocketbase';
import { useEffect, useState } from 'react';
export default () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
      if (typeof window !== "undefined") {
          setUserEmail(localStorage.getItem("email"));
      }
  }, []);

    const router = useRouter();
    
    const setpasswords = async(password : string) => {
        try{
          console.log("User set password" , userEmail);
          const records = await pb.collection('User').getFirstListItem(`User_email = '${userEmail}'`);
          const id = records.id
          const Storepassword = await pb.collection('User').update(id , {
            Password: password
          });
          console.log(Storepassword);
          router.push("/User");
        } catch (err){
          console.log(err)
        }
      }


    // ... previous code remains the same
    return (
      <div className="flex justify-center items-center w-9/12 m-auto h-dvh ">
        <div className="flex justify-center flex-col items-center w-full h-full m-auto rounded-2xl ">
          <Logo/> 
          <Password onSubmit={setpasswords}/> 
        </div>
      </div>
    );

}
