import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: '',
    vendor: '',
    category: '',
    description: ''
  });
  const [img, setImg] = useState(null);
  const [vendors, setV] = useState([]);
  const [cats, setC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load product, vendors, and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, vendRes, catRes] = await Promise.all([
          API.get(`/products/${id}`),
          API.get('/vendors'),
          API.get('/categories')
        ]);
        setForm(prodRes.data);
        setV(vendRes.data);
        setC(catRes.data);
      } catch (err) {
        console.error('Failed to load data:', err);
        alert('Failed to load product data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('price', form.price);
    fd.append('vendor', form.vendor);
    fd.append('category', form.category);
    fd.append('description', form.description);
    if (img) fd.append('image', img);

    try {
      await API.put(`/admin/products/${id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product updated successfully!');
      nav('/products');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update product.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form className="card" onSubmit={handleSubmit} style={{ display:'grid', gap:12, maxWidth:400 }}>
        <input
          name="name"
          value={form.name || ''}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price || ''}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <select name="vendor" value={form.vendor || ''} onChange={handleChange} required>
          <option value="">Select Vendor</option>
          {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>
        <select name="category" value={form.category || ''} onChange={handleChange} required>
          <option value="">Select Category</option>
          {cats.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <textarea
          name="description"
          value={form.description || ''}
          onChange={handleChange}
          placeholder="Description"
        />
        <input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Updating...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
