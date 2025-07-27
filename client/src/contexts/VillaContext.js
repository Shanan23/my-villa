import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const VillaContext = createContext();

const initialState = {
  villas: [],
  featuredVillas: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    guests: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
  },
};

const villaReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_VILLAS':
      return {
        ...state,
        villas: action.payload.villas,
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case 'SET_FEATURED_VILLAS':
      return {
        ...state,
        featuredVillas: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      };
    case 'ADD_VILLA':
      return {
        ...state,
        villas: [action.payload, ...state.villas],
      };
    case 'UPDATE_VILLA':
      return {
        ...state,
        villas: state.villas.map((villa) =>
          villa._id === action.payload._id ? action.payload : villa
        ),
      };
    case 'DELETE_VILLA':
      return {
        ...state,
        villas: state.villas.filter((villa) => villa._id !== action.payload),
      };
    default:
      return state;
  }
};

export const VillaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(villaReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [dispatch]);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [dispatch]);

  // Fetch villas with filters
  const fetchVillas = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries({ ...state.filters, ...filters }).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(`/api/villas?${params}`);
      
      dispatch({
        type: 'SET_VILLAS',
        payload: {
          villas: response.data.villas,
          pagination: response.data.pagination,
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch villas');
      toast.error('Failed to fetch villas');
    }
  }, [state.filters, dispatch, setLoading, setError]);

  // Fetch featured villas
  const fetchFeaturedVillas = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching featured villas...');
      
      const response = await axios.get('/api/villas/featured/list');
      console.log('Featured villas response:', response.data);
      console.log('Response type:', typeof response.data);
      console.log('Response isArray:', Array.isArray(response.data));
      
      // Ensure we have an array of villas
      let villas = [];
      if (Array.isArray(response.data)) {
        villas = response.data;
      } else if (response.data && response.data.villas && Array.isArray(response.data.villas)) {
        villas = response.data.villas;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        villas = response.data.data;
      } else {
        console.warn('Unexpected response format:', response.data);
        villas = [];
      }
      
      console.log('Processed villas:', villas);
      dispatch({ type: 'SET_FEATURED_VILLAS', payload: villas });
    } catch (error) {
      console.error('Error fetching featured villas:', error);
      setError(error.response?.data?.message || 'Failed to fetch featured villas');
      // Set empty array as fallback
      dispatch({ type: 'SET_FEATURED_VILLAS', payload: [] });
    }
  }, [dispatch, setLoading, setError]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/villas/categories/list');
      dispatch({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch categories');
    }
  }, [dispatch, setLoading, setError]);

  // Fetch single villa
  const fetchVilla = useCallback(async (id) => {
    try {
      const response = await axios.get(`/api/villas/${id}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch villa details');
      throw error;
    }
  }, []);

  // Create villa (admin)
  const createVilla = useCallback(async (villaData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/villas', villaData);
      dispatch({ type: 'ADD_VILLA', payload: response.data });
      toast.success('Villa created successfully!');
      return { success: true, villa: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create villa';
      toast.error(message);
      return { success: false, message };
    }
  }, [dispatch, setLoading]);

  // Update villa (admin)
  const updateVilla = useCallback(async (id, villaData) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/villas/${id}`, villaData);
      dispatch({ type: 'UPDATE_VILLA', payload: response.data });
      toast.success('Villa updated successfully!');
      return { success: true, villa: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update villa';
      toast.error(message);
      return { success: false, message };
    }
  }, [dispatch, setLoading]);

  // Delete villa (admin)
  const deleteVilla = useCallback(async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/villas/${id}`);
      dispatch({ type: 'DELETE_VILLA', payload: id });
      toast.success('Villa deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete villa';
      toast.error(message);
      return { success: false, message };
    }
  }, [dispatch, setLoading]);

  // Update filters
  const updateFilters = useCallback((filters) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters });
  }, [dispatch]);

  // Reset filters
  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, [dispatch]);

  // Upload images
  const uploadImages = useCallback(async (images) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post('/api/admin/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Images uploaded successfully!');
      return { success: true, images: response.data.images };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to upload images';
      toast.error(message);
      return { success: false, message };
    }
  }, []);

  const value = {
    // State
    villas: state.villas,
    featuredVillas: state.featuredVillas,
    categories: state.categories,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,

    // Actions
    fetchVillas,
    fetchFeaturedVillas,
    fetchCategories,
    fetchVilla,
    createVilla,
    updateVilla,
    deleteVilla,
    uploadImages,
    updateFilters,
    resetFilters,
    setLoading,
    setError,
  };

  return <VillaContext.Provider value={value}>{children}</VillaContext.Provider>;
};

export const useVilla = () => {
  const context = useContext(VillaContext);
  if (!context) {
    throw new Error('useVilla must be used within a VillaProvider');
  }
  return context;
}; 