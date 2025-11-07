'use client'

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { User } from "./page"
import useClickOutside from "@/hooks/useClickOutside"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import api from "@/lib/api"


const editSchema = z.object({
    name: z
        .string()
        .nonempty('Imie jest wymagane')
        .min(3, 'Imie musi być dłuższe niż 3 znaki'),
    email: z
        .string()
        .nonempty('Email jest wymagany')
        .email('Niepoprawny adres email'),
    gender:z.string(),
    status:z.string()
})

type EditType = z.infer<typeof editSchema>

function EditModal({user,closeModal, setUsers}: {user:User, closeModal:()=>void, setUsers: React.Dispatch<React.SetStateAction<User[] | null>>}) {
    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting },
        reset,
    } = useForm<EditType>({ resolver: zodResolver(editSchema),defaultValues: {
    name: user.name,
    email: user.email,
    gender: user.gender,
    status: user.status,
} })

const [editError,setEditError]=useState('')

    const modalRef = useRef(null)

    useClickOutside(modalRef, closeModal)

     useEffect(() => {
       
        document.body.classList.add('body-modal-open')
        document.documentElement.classList.add('body-modal-open')
        return () => {
            document.body.classList.remove('body-modal-open')
            document.documentElement.classList.remove('body-modal-open')
        }
    }, )

const handleUserUpdated = (updatedUser: User) => {
  setUsers((prev) =>
    prev?.map((u) => (u.id === updatedUser.id ? updatedUser : u)) ?? prev
  );
};


      const onSubmit: SubmitHandler<EditType> = async (data) => {
       if (!user?.id) return;
       
      try {
    
     const updated = await api.updateUser(user.id, data);

    //  update users list without refetch data

    handleUserUpdated(updated); 

    reset();          
    closeModal();    
  } catch (err) {
    console.log(err)
    setEditError("Błąd aktualizacji użytkownika");
  }
    }

    return (
        createPortal(
                            <div
                                className={`bg-slate-100/50 fixed left-0 top-0 z-100 flex h-dvh w-full items-end justify-center overflow-hidden backdrop-blur-xs lg:items-center`}>
                                <div
                                    className=" max-h-dvh w-full overflow-y-auto max-w-xl animate-visible bg-white border border-gray-300 rounded-t-2xl lg:rounded-2xl"
                                    ref={modalRef}>
                                   <form className='w-full flex flex-col gap-4 px-4 py-6 lg:p-8' onSubmit={handleSubmit(onSubmit)}>
                                    <Input name="name" label="Imię użytkownika"  formRegister={register('name')} disabled={isSubmitting} defaultValue={user.name}  formError={ errors?.name?.message || null} />
                                    <Input name="email" label="Adres e-mail" formRegister={register('email')} defaultValue={user.email}  formError={ errors?.email?.message || null} disabled={isSubmitting}/>
                                   
                                    <div className="flex w-full flex-col">
            <label htmlFor='gender' className="text-primary2 mb-2 text-sm leading-5 sm:text-base">
				Wybierz płeć <span className="font-medium text-purple-500">*</span>
			</label>
            <div className="relative mt-1">
                <select
					
					id='gender'
					className={` w-full rounded-lg border bg-white px-4 py-1.5 sm:py-2 text-sm outline-none transition-colors duration-300  focus:outline-none sm:h-10 h-9 focus-visible:border-purple-400 disabled:bg-stone-300  border-stone-300 text-gray-700}`}
					defaultValue={user.gender || 'female'}
                    {...register('gender')}  disabled={isSubmitting}
					
					>
                        <option  value='female'>
							Kobieta
							</option>
                        <option  value='male'>
							Mężczyzna
							</option>
                    </select>
            </div>

            	{editError && <span className={`ml-0.5 mt-2 inline-block self-start text-xs sm:text-sm tracking-[0.2px] text-red-500 lg:mt-1.5 `}>
					{editError}
				</span>}
        </div>
                                      <Button restClass='mt-3' type="submit" disabled={isSubmitting}>Edytuj</Button>
                                   </form>
                                </div>
                            </div>,
                            document.body
                        )
    )
}

export default EditModal
