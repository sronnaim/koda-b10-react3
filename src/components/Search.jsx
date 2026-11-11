import { useEffect, useState } from "react"

export default function Search({ setQuery }) {
  const [input, setInput] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(input)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [input, setQuery, setInput])

  return (
    <div className="border-2 rounded-sm shadow-[4px_4px_0_0_black]">
      <label htmlFor="search-i" className="sr-only">Search characters...</label>
      <input type="search" id="search-i" name="search" className="outline-none p-2 appearance-none w-full max-w-[50ch]" placeholder="Search characters..." onInput={(e) => {
        setInput(e.currentTarget.value.toLowerCase().trim())
      }} />
    </div>
  )
}