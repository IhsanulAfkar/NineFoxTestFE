import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useForm } from 'react-hook-form'
import { SubmitFormType } from '../types'
import Input from '../components/Input'
import UploadFile from '../components/UploadFile'
import { userCategories } from '../data/categories'
import { fetchClient } from '../helper/fetchClient'
import toast from 'react-hot-toast'

const App = () => {
  const { register, formState: { errors }, setError, handleSubmit, watch } = useForm<SubmitFormType>()
  const [files, setfiles] = useState<File[]>([])
  const [category, setcategory] = useState('')
  const [passwordValidator, setPasswordValidator] = useState({
    eightLength: false,
    lowerCase: false,
    upperCase: false,
    numeric: false,
    // specialChar: false
  })

  const strongRegex = {
    eightLength: new RegExp("^(?=.{8,})"),
    lowerCase: new RegExp("^(?=.*[a-z])"),
    upperCase: new RegExp("^(?=.*[A-Z])"),
    numeric: new RegExp("^(?=.*[0-9])"),
    // specialChar: new RegExp("^(?=.*[!@#$%^&*])")
  }
  const onSubmit = async (data: SubmitFormType) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'password not match'
      })
      return
    }
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    formData.append('category', category)
    formData.append('description', data.description)
    formData.append('phone', data.phone)
    if (files.length > 0) {
      // @ts-ignore
      formData.set('media', files[0].file, files[0].name)
    }
    console.log(Array.from(formData))
    const result = await fetchClient({
      method: 'POST',
      body: formData,
      url: '/users'
    })
    if (result?.ok) {
      toast.success('User create successfully')
      window.location.href = '/data'
      return
    }

    toast.error('Failed to create user')
    if (result?.status === 400) {
      const resultData = await result.json()
      Object.entries(resultData.error).map(([key, value]) => {
        // @ts-ignore
        setError(key, {
          type: 'custom',
          message: value
        })
      })
    }
  }
  useEffect(() => {
    window.document.title = 'Create User'
  }, [])
  useEffect(() => {
    console.log(category)
  }, [category])
  useEffect(() => {
    const watchPassword = watch(value => {
      const password: string = value.password!
      if (strongRegex.eightLength.test(password))
        setPasswordValidator(prev => ({ ...prev, eightLength: true }))
      else
        setPasswordValidator(prev => ({ ...prev, eightLength: false }))
      if (strongRegex.lowerCase.test(password))
        setPasswordValidator(prev => ({ ...prev, lowerCase: true }))
      else
        setPasswordValidator(prev => ({ ...prev, lowerCase: false }))
      if (strongRegex.upperCase.test(password))
        setPasswordValidator(prev => ({ ...prev, upperCase: true }))
      else
        setPasswordValidator(prev => ({ ...prev, upperCase: false }))
      if (strongRegex.numeric.test(password))
        setPasswordValidator(prev => ({ ...prev, numeric: true }))
      else
        setPasswordValidator(prev => ({ ...prev, numeric: false }))
    })
    return () => watchPassword.unsubscribe()
  }, [watch, passwordValidator])
  const successClass = 'transition ease-in-out text-green-40 duration-500 '
  const failedClass = 'transition ease-in-out text-danger duration-500 '
  return (
    <>
      <Card className='w-full max-w-6xl max-h-[80vh] overflow-y-auto'>
        <form className='flex gap-8 flex-col md:flex-row w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full md:max-w-sm flex flex-col gap-2'>
            <p className='md:text-3xl text-2xl font-bold mb-2'>Create User</p>

            <Input
              required
              register={register}
              config={{
                title: 'Username',
                name: 'username',
                placeholder: 'Your username',
                registerConfig: {
                  required: 'required'
                },
                type: 'text',
                error: errors.username
              }}
            />
            <Input
              required
              register={register}
              config={{
                title: 'Email',
                name: 'email',
                placeholder: 'Your Email',
                registerConfig: {
                  required: 'email required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  },
                },
                type: 'email',
                error: errors.email
              }}
            />
            <Input
              required
              register={register}
              config={{
                title: 'Phone Number',
                name: 'phone',
                placeholder: '08xxxxxxx',
                registerConfig: {
                  required: 'phone required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid phone number"
                  },
                  minLength:8
                },
                type: 'text',
                error: errors.phone
              }}
            />
            <Input
              required
              register={register}
              config={{
                title: 'Password',
                name: 'password',
                placeholder: '**********',
                registerConfig: {
                  required: 'password required',
                },
                type: 'password',
                error: errors.password
              }}
            />
            <div className="bg-neutral-75 rounded-md py-2 px-4 mt-2 text-[#777C88] text-sm">
              <p>Password must include :</p>
              <div className="ml-2">
                <div className="">
                  {passwordValidator.eightLength ? (<p className={successClass}>&#10003; At least 8 characters </p>
                  ) : (<p className={failedClass}>At least 8 characters </p>)}
                  {passwordValidator.lowerCase ? (<p className={successClass}>&#10003; Lowercase (a-z) </p>
                  ) : (<p className={failedClass}>Lowercase (a-z) </p>)}
                  {passwordValidator.upperCase ? (<p className={successClass}>&#10003; Uppercase (A-Z)</p>
                  ) : (<p className={failedClass}>Uppercase (A-Z)</p>)}
                  {passwordValidator.numeric ? (<p className={successClass}>&#10003; Number</p>
                  ) : (<p className={failedClass}>Number</p>)}
                </div>
              </div>
            </div>
            <Input required register={register} config={{
              name: 'confirmPassword',
              type: 'password',
              placeholder: '**********',
              error: errors.confirmPassword,
              registerConfig: {
                required: 'required',
                validate: (value: String) => {
                  if (value != watch('password'))
                    return 'Password do not match'
                }
              },
              title: 'Confirm Password'
            }} />
          </div>
          <div className='w-full flex flex-col gap-4 justify-between'>
            <div className='flex flex-col gap-4 mt-2'>
              <div>
                <p className='font-semibold'>Category <span className='text-danger'>*</span></p>
                <select
                  className='mt-1 px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border  border-customNeutral/50 hover:border-customNeutral focus:border-primary hover:cursor-pointer'
                  value={category}
                  onChange={e => setcategory(e.target.value)}
                >
                  {userCategories.map(ctg => <option key={ctg} value={ctg}>{ctg}</option>)}
                </select>
              </div>
              <div className=''>
                <p className='font-semibold'>Description</p>
                <textarea style={{
                  resize: 'none'
                }} className={'mt-1 px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border ' + (errors.description ? 'border-danger/50 hover:border-danger focus:border-danger' : ' border-customNeutral/50 hover:border-customNeutral focus:border-primary ')}
                  {...register('description')} rows={3}></textarea>
              </div>
              <div>
                <p className='font-semibold mb-1'>Images</p>
                <UploadFile
                  files={files}
                  setfiles={setfiles}
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <button type='submit' className="px-6 py-3 bg-primary text-white font-bold rounded-md transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                Create User
              </button>
            </div>
          </div>
        </form>
      </Card>
    </>
  )
}

export default App
