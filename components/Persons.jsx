const token = process.env.TMDB_TOKEN

const api = process.env.TMDB_API

async function fetchCasts(id) {
    const res = await fetch(
        `${api}/movie/${id}/credits`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return (await res.json()).cast
}

export default async function Persons({movie}) {
    const casts = await fetchCasts(movie.id)

    const profile = "http://image.tmdb.org/t/p/w185"

    return (
        <div className="flex flex-row flex-wrap">
            {casts.map(cast => {
                return (
                    <div
                        key={cast.id}
                        className="w-1/5 p-4 text-center flex flex-col justify-between"
                    >
                        {cast.profile_path ? (
                            <img src={profile+cast.profile_path} alt="" />
                        ): (
                            <div></div>
                        )}

                        <div className="p-2">
                            <div className="text-sm">{cast.name}</div>

                            <span className="text-sm text-gray-500">{cast.character}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}