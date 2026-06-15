## All Schemas or Tables

# User Schema

```
CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user', 'moderator') NOT NULL DEFAULT 'user',
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

```

# Product Schema

```
CREATE TABLE products (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
   ON DELETE CASCADE
   ON UPDATE CASCADE
);

```

# Product Images

```
CREATE TABLE product_images (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id INTEGER NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
);

```

# Product Category

```
CREATE TABLE categories  (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    product_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
)

```

# Order Schema

```
CREATE TABLE orders (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  cupon_id INT,
  status ENUM('pending', 'processing', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
  ,
  FOREIGN KEY (product_id) REFERENCES products(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
);

```

# Shipping Schema

```
CREATE TABLE shipping (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  shipping_method ENUM('standard', 'expedited', 'cash_on_delivery') NOT NULL DEFAULT 'cash_on_delivery',
  shipping_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
   ON DELETE CASCADE
   ON UPDATE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id)
   ON DELETE CASCADE
   ON UPDATE CASCADE
);

```

# Payment Schema

```
CREATE TABLE payments (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id INTEGER NOT NULL,
  payment_method ENUM('cash', 'credit_card', 'cash_on_delivery') NOT NULL DEFAULT 'cash_on_delivery',
  payment_status ENUM('paid', 'refunded', 'pending') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
);

```

# Wishlist Schema

```
CREATE TABLE wishlists (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
  ,
  FOREIGN KEY (product_id) REFERENCES products(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
);

```

# Review Schema

```
CREATE TABLE reviews (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
  ,
  FOREIGN KEY (product_id) REFERENCES products(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
);

```

# Cupon Schema

```
CREATE TABLE coupons (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type VARCHAR(20) NOT NULL, -- percentage / fixed
  discount_value DECIMAL(10,2) NOT NULL,
  min_order_amount DECIMAL(10,2),
  max_discount DECIMAL(10,2),
  usage_limit INT,
  used_count INT DEFAULT 0,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

# Notification Schema

```
CREATE TABLE notifications (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  type VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
  ,
  FOREIGN KEY (product_id) REFERENCES products(id)
   ON DELETE CASCADE
    ON UPDATE CASCADE
);

```
