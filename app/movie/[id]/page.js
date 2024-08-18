import Persons from "@/components/Persons"
import {Badge} from "@/components/ui/badge"

const token = process.env.TMDB_TOKEN

const api = process.env.TMDB_API

async function fetchMovie(id) {
    const res = await fetch(`${api}/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return await res.json()
}

export default async function Movie({params}) {
    const movie = await fetchMovie(params.id)

    const cover = "http://image.tmdb.org/t/p/w1280"

    return (
        <>
            <h2 className="font-bold">
                {movie.title}

                <span className="ml-1">
                    ({movie.release_date.split("-")[0]})
                </span>
            </h2>

            <div className="mb-4 mt-2">
                {movie.genres.map(genre => {
                    return (
                        <Badge 
                            key={genre.id}
                            variant="outline"
                            className="mr-2"
                        >
                            {genre.name}
                        </Badge>
                    )
                })}
            </div>

            <img src={cover+movie.backdrop_path} />

            <p className="mt-3">{movie.overview}</p>

            <div className="mt-5">
                <h3 className="font-bold border border-b mb-4 pb-2">Starring</h3>

                <Persons movie={movie} />
            </div>
        </>
    )
}