'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PageTitle from '@/components/ui/PageTitle'
import { useRef, useState } from 'react'

function PeselValidator() {
	const [pesel, setPesel] = useState('')
	const [errors, setErrors] = useState<string[] | null>(null)
	const [success, setSuccess] = useState<boolean>(false)
  const peselRef = useRef<HTMLInputElement>(null);


  const setPeselValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  const value = e.target.value.trim();
  setPesel(value);

    if(errors || success) {

      
      setErrors(null)
      setSuccess(false)
    }
     


  }


	const validatePesel = (pesel: string): string[] => {
    const errors: string[] = [];

    if (pesel.length !== 11) {
      errors.push("PESEL musi mieć dokładnie 11 cyfr");
    }

    if (!/^\d+$/.test(pesel)) {
      errors.push("PESEL może zawierać tylko cyfry");
    }

    if (errors.length === 0) {
      const digits = pesel.split("").map(Number);
      const year = 1900 + digits[0] * 10 + digits[1];
      let month = digits[2] * 10 + digits[3];
      const day = digits[4] * 10 + digits[5];

      let fullYear = year;
      if (month > 80 && month < 93) fullYear = year - 100;
      else if (month > 20 && month < 33) fullYear = year + 100;
      else if (month > 40 && month < 53) fullYear = year + 200;
      else if (month > 60 && month < 73) fullYear = year + 300;
      else if (month < 1 || month > 12) {
        errors.push("Niepoprawny miesiąc w numerze PESEL");
      }

      month = ((month - 1) % 20) + 1;

      const date = new Date(fullYear, month - 1, day);
      if (
        date.getFullYear() !== fullYear ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        errors.push("Niepoprawna data urodzenia w numerze PESEL");
      }

      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      const checksum = digits
        .slice(0, 10)
        .reduce((sum, digit, i) => sum + digit * weights[i], 0);
      const control = (10 - (checksum % 10)) % 10;

      if (control !== digits[10]) {
        errors.push("Numer PESEL nie spełnia wymogów poprawności");
      }
    }

    return errors;
  };


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validatePesel(pesel);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSuccess(false)
    } else {
      setErrors(null);
      setSuccess(true)
      peselRef.current?.blur();
    
    }
  };

   

	return (
		<section className="w-full max-w-xl mx-auto">
			<PageTitle title="Weryfikacja numeru PESEL" />
      <div>

			<form onSubmit={onSubmit} className="pt-8 sm:pt-12 flex  gap-6 items-start ">
				<Input
					label="Numer pesel"
					name="pesel"
					type="numeric"
					value={pesel}
					errors={errors}
          success={success}
					onChange={setPeselValue}
          ref={peselRef}
          />
        
				<Button restClass='mt-7' type="submit">Sprawdź</Button>
			</form>
      {errors && errors.length > 0 && 
			<div className='flex flex-col'>

				{errors.map((error,idx)=> <span key={idx} className={`ml-0.5 mt-2 inline-block self-start text-xs sm:text-sm tracking-[0.2px] text-red-500 lg:mt-1.5 `}>
					{error}
				</span>)}
			</div>
				
			}
          </div>
      {success &&
      <p className=' sm:text-xl font-medium mt-8 text-green-400'>Numer pesel jest poprawny</p>
      }
		</section>
	)
}

export default PeselValidator
