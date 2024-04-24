import { FC } from 'react'
interface props {
    register: any,
    config: ConfigProps,
    required?: boolean
}
interface ConfigProps {
    name: string,
    title?: string,
    placeholder: string,
    type?: string,
    error?: any
    data?: any,
    registerConfig: any
}
const Input: FC<props> = ({ config, register, required = true }) => {
    return (
        <div className="">
            <label
                className='font-semibold'
                htmlFor={config.name}>{config.title || config.name}
                {required && <span className='text-danger'>&nbsp;*</span>}</label>
            <input type={config.type || 'text'} placeholder={config.placeholder} className={'mt-1 px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border ' + (config.error ? 'border-danger/50 hover:border-danger focus:border-danger' : ' border-customNeutral/50 hover:border-customNeutral focus:border-primary ')} {...register(config.name, config.registerConfig)} />
            {config.error && (<p className="text-danger text-xs">{`${config.error.message}`}</p>)}
        </div>
    )
}

export default Input