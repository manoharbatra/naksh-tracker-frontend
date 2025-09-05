import { useEffect, useState, useCallback } from "react"
import { getData } from "../api/classCategoryApi"

export const useClassCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getData("/class-categories")
      setCategories(data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load categories")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return { categories, loading, error, refetch: fetchCategories }
}
