import { useNavigate } from "react-router"

export default function Search() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.currentTarget).entries())
    const sp = new URLSearchParams(form)

    navigate('/?'.concat(sp.toString()))
  }

  return (
    <form action={'/'} onSubmit={handleSubmit} className="border-2 rounded-sm shadow-[4px_4px_0_0_black]">
      <label htmlFor="search-i" className="sr-only">Search characters...</label>
      <input type="text" id="search-i" name="q" className="outline-none p-2 appearance-none w-full max-w-[50ch]" placeholder="Search characters..." />
    </form>
  )
}