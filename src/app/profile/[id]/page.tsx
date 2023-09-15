export default function UserProfile( {params}: any ) {  //params of type any
    // const userId = params.id;
    // console.log({userId});

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>

            <p className="text-3xl">Profile page
                <span className="bg-rose-500 m-2 rounded-md py-1 px-3">{params.id}</span>
            </p>
        </div>
    )
}