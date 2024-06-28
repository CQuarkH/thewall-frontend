import { usePosts } from 'src/hooks/usePosts';

function HottestTrendsSection() {
    const { posts } = usePosts();
    const postsClone = [...posts];
    const trends = [...postsClone.sort((a, b) => b.likedBy.length - a.likedBy.length).slice(0, 5)];

    return (
        <aside className='[grid-area:aside] flex flex-col gap-8 border-l border-white/10 h-full py-6 px-6 bg-black'>

            <h1 className='text-2xl font-bold'>Top Trends

            </h1>

            <div className='flex flex-col gap-4'>
                {trends.map((post, index) => (
                    <div
                        className={`flex w-full border border-white/20 rounded-lg`} key={index} >
                        <div className='flex flex-col relative gap-2 w-full p-4'>
                            <span className='absolute top-[-35px] left-[-10px]'>
                                {
                                    index === 0 ? (
                                        <span className='bg-black p-1.5 rounded-full'><svg
                                            className='w-6 h-6 text-yellow-500'
                                            xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24"><path fill="currentColor" d="M2.776 5.106L3.648 11h12.736l.867-5.98l-3.493 3.02l-3.755-4.827l-3.909 4.811zm10.038-1.537l-.078.067l.141.014l1.167 1.499l1.437-1.242l.14.014l-.062-.082l2.413-2.086a1 1 0 0 1 1.643.9L18.115 13H1.922L.399 2.7a1 1 0 0 1 1.65-.898L4.35 3.827l-.05.06l.109-.008l1.444 1.27l1.212-1.493l.109-.009l-.06-.052L9.245.976a1 1 0 0 1 1.565.017zM2 14h16v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" /></svg></span>
                                    ) : (<></>)
                                }
                            </span>
                            <span>{post.content}</span>
                            <span className='text-xs text-white/50'>{post.user.username}</span>

                        </div>
                        {
                            post.photoUrls.length > 0 && (
                                <img src={post.photoUrls[0]} className='h-full w-[20%] object-cover rounded-r-lg' />
                            )
                        }
                    </div>
                ))}
            </div>

        </aside>
    )
}

export default HottestTrendsSection