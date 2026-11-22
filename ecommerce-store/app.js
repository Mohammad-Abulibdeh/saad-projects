import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function loadProducts() {
  const { data, error } = await supabase.from('products').select('*')
  const container = document.getElementById('products-container')
  if (container && data) {
    data.forEach(p => {
      const item = document.createElement('div')
      item.innerHTML = `<img src="${p.image_url}" alt="${p.name}" /><h3>${p.name}</h3><p>${p.description}</p><p>${p.price}₪</p><button onclick="buyProduct('${p.name}', ${p.price})">شراء</button>`
      container.appendChild(item)
    })
  }
}

window.buyProduct = async function(name, price) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const link = \`https://wa.me/PHONE_NUMBER?text=اشتريت%20المنتج%20\${name}%20بسعر%20\${price}%20₪%20بتاريخ%20\${new Date().toISOString().split('T')[0]}%20من%20https://maps.google.com/?q=\${lat},\${lon}\`
    window.open(link, '_blank')
  })
}

window.checkPassword = async function() {
  const input = document.getElementById('admin-password').value
  const { data, error } = await supabase.from('admin_settings').select('admin_password').single()
  if (input === data.admin_password) {
    window.location.href = 'admin-dashboard.html'
  } else {
    alert('كلمة المرور خاطئة')
  }
}

window.addProduct = async function() {
  const name = document.getElementById('product-name').value
  const description = document.getElementById('product-desc').value
  const price = parseFloat(document.getElementById('product-price').value)
  const image_url = document.getElementById('product-img').value
  await supabase.from('products').insert([{ name, description, price, image_url }])
  alert('تمت إضافة المنتج')
}

window.updateSettings = async function() {
  const site_name = document.getElementById('site-name').value
  const logo_url = document.getElementById('logo-url').value
  const theme_color = document.getElementById('theme-color').value
  const admin_password = document.getElementById('new-password').value
  await supabase.from('admin_settings').update({ site_name, logo_url, theme_color, admin_password })
}
