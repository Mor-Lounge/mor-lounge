// src/pages/AdminPanel.js
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    async function fetchData() {
      const catSnap = await getDocs(collection(db, "categories"));
      setCategories(catSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const prodSnap = await getDocs(collection(db, "products"));
      setProducts(prodSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchData();
  }, []);

  async function addCategory() {
    if (!newCategoryName || !newCategoryImage)
      return alert("Kategori adı ve resim URL giriniz.");
    await addDoc(collection(db, "categories"), {
      name: newCategoryName,
      image: newCategoryImage,
    });
    setNewCategoryName("");
    setNewCategoryImage("");
    const catSnap = await getDocs(collection(db, "categories"));
    setCategories(catSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  async function addProduct() {
    if (!newProduct.name || !newProduct.category || !newProduct.price)
      return alert("Ürün adı, kategori ve fiyat giriniz.");
    await addDoc(collection(db, "products"), {
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
    });
    setNewProduct({
      name: "",
      category: "",
      description: "",
      price: "",
      image: "",
    });
    const prodSnap = await getDocs(collection(db, "products"));
    setProducts(prodSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  async function deleteCategory(id) {
    if (!window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
    await deleteDoc(doc(db, "categories", id));
    setCategories(categories.filter((cat) => cat.id !== id));
  }

  async function deleteProduct(id) {
    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((prod) => prod.id !== id));
  }

  function logout() {
    signOut(auth);
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Admin Panel</h1>
      <button onClick={logout} style={{ marginBottom: 20 }}>
        Çıkış Yap
      </button>

      <section>
        <h2>Kategoriler</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              {cat.name}{" "}
              <button onClick={() => deleteCategory(cat.id)}>Sil</button>
            </li>
          ))}
        </ul>
        <input
          placeholder="Kategori adı"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Kategori resim URL"
          value={newCategoryImage}
          onChange={(e) => setNewCategoryImage(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={addCategory}>Kategori Ekle</button>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Ürünler</h2>
        <ul>
          {products.map((prod) => (
            <li key={prod.id}>
              {prod.name} ({prod.category}) - {prod.price} TL{" "}
              <button onClick={() => deleteProduct(prod.id)}>Sil</button>
            </li>
          ))}
        </ul>
        <input
          placeholder="Ürün adı"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          style={{ marginRight: 10 }}
        />
        <select
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          style={{ marginRight: 10 }}
        >
          <option value="">Kategori seç</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Açıklama"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Fiyat"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Resim URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          style={{ marginRight: 10 }}
        />
        <button onClick={addProduct}>Ürün Ekle</button>
      </section>
    </div>
  );
}