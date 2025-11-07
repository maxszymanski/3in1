import { InputHTMLAttributes, RefObject } from 'react'

interface InputType extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	errors?: string[] | null
	name: string
	label?: string | null
	textarea?: boolean
	success?: boolean
	ref?:RefObject<HTMLInputElement | null> | null
	  formRegister?: object
	  formError? :string | null
}

function Input({ name, label, errors,success=false,ref=null,formRegister={},formError, textarea = false, ...rest }: InputType) {

	const isError = errors && errors.length > 0 || formError
	return (
		<div className="flex w-full flex-col">
			{label &&

				<label htmlFor={name} className="text-primary2 mb-2 text-sm leading-5 sm:text-base">
				{label} <span className="font-medium text-purple-500">*</span>
			</label>
			}
			{textarea ? (
				<textarea
					name={name}
					id={name}
					
					{...rest}
					className={` h-[120px] w-full resize-none rounded-lg border bg-white px-4 py-2.5 text-sm outline-none  transition-colors duration-300 focus:outline-none focus-visible:border-purple-400 disabled:bg-stone-300 ${
						isError ? 'border-red-500 text-red-500' : 'border-stone-300'
					}`}
				/>
			) : (
				<input
					name={name}
					id={name}
					ref={ref}
					{...formRegister}
					{...rest}
					className={` w-full rounded-lg border bg-white px-4 py-1.5 sm:py-2 text-sm outline-none transition-colors duration-300  focus:outline-none sm:h-10 h-9 focus-visible:border-purple-400 disabled:bg-stone-300 ${
      isError
        ? 'border-red-500 text-red-500'       
        : success
        ? 'border-green-400 text-green-600'   
        : 'border-stone-300 text-gray-700'    
    }`}
				/>
			)}

					{formError && <span className={`ml-0.5 mt-2 inline-block self-start text-xs sm:text-sm tracking-[0.2px] text-red-500 lg:mt-1.5 `}>
					{formError}
				</span>}
			
		</div>
	)
}

export default Input
