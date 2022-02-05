import Link from 'next/link';

export default () => {
    return (
        <nav className="bg-black">
            <div className="py-2 pl-3 pr-1 mx-auto border">
                <div className="flex justify-between">
                    <Link href="https://github.com/lem6ns/movolo">
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 36 36">
                            <path
                                fill="#FFCC4D"
                                d="M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0s18 8.059 18 18"
                            ></path>
                            <path
                                fill="#292F33"
                                fillRule="evenodd"
                                d="M1.24 11.018c.24.239 1.438.957 1.677 1.675.24.717.72 4.784 2.158 5.981 1.483 1.232 7.077.774 8.148.24 2.397-1.195 2.691-4.531 3.115-6.221.239-.957 1.677-.957 1.677-.957s1.438 0 1.678.956c.424 1.691.72 5.027 3.115 6.221 1.072.535 6.666.994 8.151-.238 1.436-1.197 1.915-5.264 2.155-5.982.238-.717 1.438-1.435 1.677-1.674.241-.239.241-1.196 0-1.436-.479-.478-6.134-.904-12.223-.239-1.215.133-1.677.478-4.554.478-2.875 0-3.339-.346-4.553-.478-6.085-.666-11.741-.24-12.221.238-.239.239-.239 1.197 0 1.436z"
                                clipRule="evenodd"
                            ></path>
                            <path
                                fill="#664500"
                                d="M27.335 23.629a.501.501 0 00-.635-.029c-.039.029-3.922 2.9-8.7 2.9-4.766 0-8.662-2.871-8.7-2.9a.5.5 0 00-.729.657C8.7 24.472 11.788 29.5 18 29.5s9.301-5.028 9.429-5.243a.499.499 0 00-.094-.628z"
                            ></path>
                        </svg>
                    </Link>
                    <div className='flex space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    )
}