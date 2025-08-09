-- Tạo bảng customer
CREATE TABLE customer
(
    customer_id SERIAL PRIMARY KEY,
    first_name  VARCHAR(50)  NOT NULL,
    last_name   VARCHAR(50)  NOT NULL,
    email       VARCHAR(100) NOT NULL,
    phone       VARCHAR(20),
    address     TEXT,
    city        VARCHAR(50),
    country     VARCHAR(50),
    postal_code VARCHAR(20),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login  TIMESTAMP
);

-- Tạo bảng product
CREATE TABLE product
(
    product_id     SERIAL PRIMARY KEY,
    name           VARCHAR(200)   NOT NULL,
    description    TEXT,
    price          DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER        NOT NULL,
    category       VARCHAR(50),
    supplier       VARCHAR(100),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP
);

-- Tạo bảng order
CREATE TABLE "order"
(
    order_id             SERIAL PRIMARY KEY,
    customer_id          INTEGER        NOT NULL,
    order_date           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status               VARCHAR(20)    NOT NULL,
    total_amount         DECIMAL(12, 2) NOT NULL,
    shipping_address     TEXT,
    shipping_city        VARCHAR(50),
    shipping_country     VARCHAR(50),
    shipping_postal_code VARCHAR(20),
    payment_method       VARCHAR(50),
    tracking_number      VARCHAR(100)
);

-- Tạo bảng order_item
CREATE TABLE order_item
(
    order_item_id SERIAL PRIMARY KEY,
    order_id      INTEGER        NOT NULL,
    product_id    INTEGER        NOT NULL,
    quantity      INTEGER        NOT NULL,
    unit_price    DECIMAL(10, 2) NOT NULL,
    discount      DECIMAL(5, 2) DEFAULT 0,
    total_price   DECIMAL(10, 2) NOT NULL
);
-- Tạo dữ liệu mẫu cho bảng customer (500,000 bản ghi)
INSERT INTO customer (first_name, last_name, email, phone, address, city, country, postal_code, created_at, last_login)
SELECT 'FirstName' || i                                                                      AS first_name,
       'LastName' || i                                                                       AS last_name,
       'user' || i || '@example.com'                                                         AS email,
       '123-456-' || LPAD(i::TEXT, 4, '0')                                                   AS phone,
       'Address ' || i                                                                       AS address,
       (ARRAY ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Can Tho', 'Hai Phong'])[1 + i % 5]        AS city,
       (ARRAY ['Vietnam', 'USA', 'Japan', 'Singapore', 'Thailand'])[1 + i % 5]               AS country,
       LPAD((i % 99999)::TEXT, 5, '0')                                                       AS postal_code,
       TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day'                                AS created_at,
       TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day' + (i % 24) * INTERVAL '1 hour' AS last_login
FROM generate_series(1, 500000) AS i;

-- Tạo dữ liệu mẫu cho bảng product (1,000,000 bản ghi)
INSERT INTO product (name, description, price, stock_quantity, category, supplier, created_at, updated_at)
SELECT 'Product ' || i                                                                                     AS name,
       'Description for product ' || i                                                                     AS description,
       (random() * 1000)::DECIMAL(10, 2)                                                                   AS price,
       (random() * 1000)::INTEGER                                                                          AS stock_quantity,
       (ARRAY ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys', 'Food', 'Health'])[1 + i % 8] AS category,
       'Supplier ' || (i % 100)                                                                            AS supplier,
       TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day'                                              AS created_at,
       TIMESTAMP '2020-01-01' + (i % 1000) * INTERVAL '1 day' + (i % 100) * INTERVAL '1 hour'              AS updated_at
FROM generate_series(1, 1000000) AS i;

-- Tạo dữ liệu mẫu cho bảng order (5,000,000 bản ghi)
INSERT INTO "order" (customer_id, order_date, status, total_amount, shipping_address, shipping_city, shipping_country,
                     shipping_postal_code, payment_method, tracking_number)
SELECT (random() * 500000 + 1)::INTEGER                                                      AS customer_id,
       TIMESTAMP '2020-01-01' + (i % 1095) * INTERVAL '1 day' + (i % 24) * INTERVAL '1 hour' AS order_date,
       (ARRAY ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])[1 + i % 5]     AS status,
       (random() * 5000)::DECIMAL(12, 2)                                                     AS total_amount,
       'Shipping Address ' || i                                                              AS shipping_address,
       (ARRAY ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Can Tho', 'Hai Phong'])[1 + i % 5]        AS shipping_city,
       (ARRAY ['Vietnam', 'USA', 'Japan', 'Singapore', 'Thailand'])[1 + i % 5]               AS shipping_country,
       LPAD((i % 99999)::TEXT, 5, '0')                                                       AS shipping_postal_code,
       (ARRAY ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'])[1 + i % 4]     AS payment_method,
       'TRK' || LPAD(i::TEXT, 10, '0')                                                       AS tracking_number
FROM generate_series(1, 5000000) AS i;

-- Tạo dữ liệu mẫu cho bảng order_item (20,000,000 bản ghi)
INSERT INTO order_item (order_id, product_id, quantity, unit_price, discount, total_price)
SELECT (i / 4) + 1                                                                    AS order_id,
       (random() * 1000000 + 1)::INTEGER                                              AS product_id,
       (random() * 10 + 1)::INTEGER                                                   AS quantity,
       (random() * 1000)::DECIMAL(10, 2)                                              AS unit_price,
       (random() * 0.5)::DECIMAL(5, 2)                                                AS discount,
       (random() * 10 + 1) * (random() * 1000) * (1 - random() * 0.5)::DECIMAL(10, 2) AS total_price
FROM generate_series(1, 20000000) AS i;


-- bai 1
SELECT *
FROM customer
WHERE city = 'Ho Chi Minh';
EXPLAIN
SELECT *
FROM customer
WHERE city = 'Ho Chi Minh';
CREATE INDEX idx_customer_city ON customer (city);
-- Giải thích tại sao PostgreSQL sử dụng Sequential Scan: Không có index trên cột city, bảng lớn, và điều kiện lọc không chọn lọc cao nên quét toàn bảng hiệu quả hơn.
-- Đề xuất cách tối ưu: Tạo index trên city, chỉ định cột cụ thể thay vì SELECT *, hoặc dùng composite index nếu kết hợp với cột khác.

-- bai 2
SELECT *
FROM product
WHERE name LIKE '%Product 5000%';
EXPLAIN ANALYZE
SELECT *
FROM product
WHERE name LIKE '%Product 5000%';
CREATE INDEX idx_product_name ON product (name);
EXPLAIN ANALYZE
SELECT *
FROM product
WHERE name LIKE '%Product 5000%';
-- Giải thích sự khác biệt về hiệu suất: Trước index, quét toàn bảng, chậm. Sau index, B-tree không hiệu quả với LIKE '%...%'; cần trigram index để cải thiện.

-- bai 3
SELECT *
FROM "order"
WHERE order_id = 100000;
EXPLAIN
SELECT *
FROM "order"
WHERE order_id = 100000;
-- Giải thích tại sao PostgreSQL sử dụng Index Scan: order_id là PRIMARY KEY với B-tree index tự động, cho phép truy xuất trực tiếp, nhanh.
-- Phân tích các thông số trong kết quả EXPLAIN: Index Scan trên order_id, chi phí thấp, trả về 1 hàng, thời gian thực thi nhỏ.

-- bai 4
SELECT *
FROM "order"
WHERE status = 'Delivered';
EXPLAIN ANALYZE
SELECT *
FROM "order"
WHERE status = 'Delivered';
CREATE INDEX idx_order_status ON "order" (status);
EXPLAIN ANALYZE
SELECT *
FROM "order"
WHERE status = 'Delivered';
-- Giải thích liệu index có cải thiện hiệu suất không và tại sao: Index giúp nếu số bản ghi "Delivered" nhỏ, dùng Index Scan. Nếu tỷ lệ lớn, Sequential Scan có thể vẫn được chọn do chi phí thấp hơn.

-- bai 5
SELECT *
FROM "order"
WHERE customer_id = 10000
  AND status = 'Shipped';
EXPLAIN ANALYZE
SELECT *
FROM "order"
WHERE customer_id = 10000
  AND status = 'Shipped';
CREATE INDEX idx_order_customer_status ON "order" (customer_id, status);
EXPLAIN ANALYZE
SELECT *
FROM "order"
WHERE customer_id = 10000
  AND status = 'Shipped';
-- Giải thích lợi ích của composite index so với hai index riêng biệt: Composite index tối ưu hơn, lưu trữ theo thứ tự cả hai cột, giảm chi phí so với kết hợp hai index riêng (Bitmap Scan).

-- bai 6
SELECT category, COUNT(*)
FROM product
GROUP BY category;
EXPLAIN
SELECT category, COUNT(*)
FROM product
GROUP BY category;
CREATE INDEX idx_product_category ON product (category);
EXPLAIN
SELECT category, COUNT(*)
FROM product
GROUP BY category;
CREATE INDEX idx_product_category_covering ON product (category) INCLUDE (category);
EXPLAIN
SELECT category, COUNT(*)
FROM product
GROUP BY category;
-- Xem PostgreSQL có sử dụng Index Only Scan không: Index Only Scan xảy ra khi tất cả cột cần thiết (category) có trong index, không cần truy cập bảng.

-- bai 7
SELECT *
FROM product
WHERE price BETWEEN 100 AND 200;
EXPLAIN
SELECT *
FROM product
WHERE price BETWEEN 100 AND 200;
CREATE INDEX idx_product_price ON product (price);
EXPLAIN
SELECT *
FROM product
WHERE price BETWEEN 100 AND 200;
-- Khi nào PostgreSQL chọn Bitmap Index Scan: Chọn khi số bản ghi trả về lớn nhưng không quá nhiều, xây dựng bitmap từ index để truy xuất hiệu quả hơn Index Scan.

-- bai 8
SELECT *
FROM customer
WHERE country = 'Vietnam';
EXPLAIN
SELECT *
FROM customer
WHERE country = 'Vietnam';
CREATE INDEX idx_customer_country ON customer (country);
EXPLAIN
SELECT *
FROM customer
WHERE country = 'Vietnam';
-- Phân tích cost, rows, width: Cost là chi phí ước tính (khởi động + tổng), rows là số hàng dự đoán, width là kích thước hàng. Sau index, cost giảm do dùng Index Scan.

-- bai 9
SELECT c.customer_id, c.first_name, c.last_name, SUM(o.total_amount) as total_spent
FROM customer c
         JOIN "order" o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC
LIMIT 10;
EXPLAIN ANALYZE
SELECT c.customer_id, c.first_name, c.last_name, SUM(o.total_amount) as total_spent
FROM customer c
         JOIN "order" o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC
LIMIT 10;
-- Phân tích actual time, rows, loops: Actual time là thời gian thực thi (khởi động + tổng), rows là số hàng thực tế, loops là số lần lặp.
-- Đề xuất tối ưu: Tạo index trên customer_id (order) và total_amount để tăng tốc JOIN và ORDER BY.

-- bai 10
SELECT o.order_id, o.order_date, c.first_name, c.last_name
FROM "order" o
         JOIN customer c ON o.customer_id = c.customer_id;
EXPLAIN ANALYZE
SELECT o.order_id, o.order_date, c.first_name, c.last_name
FROM "order" o
         JOIN customer c ON o.customer_id = c.customer_id;
CREATE INDEX idx_order_customer_id ON "order" (customer_id);
EXPLAIN ANALYZE
SELECT o.order_id, o.order_date, c.first_name, c.last_name
FROM "order" o
         JOIN customer c ON o.customer_id = c.customer_id;
-- Phân tích loại scan: Ban đầu có thể dùng Sequential Scan hoặc Hash Join, sau index trên customer_id, dùng Index Scan cho JOIN, cải thiện hiệu suất.

-- bai 11
CREATE INDEX idx_product_price ON product (price);
SELECT *
FROM product
WHERE price = 500;
SELECT *
FROM product
WHERE price BETWEEN 400 AND 600;
EXPLAIN
SELECT *
FROM product
WHERE price = 500;
EXPLAIN
SELECT *
FROM product
WHERE price BETWEEN 400 AND 600;
-- Giải thích tại sao chọn loại scan khác nhau: price = 500 trả về ít bản ghi, dùng Index Scan. price BETWEEN 400 AND 600 trả về nhiều bản ghi, Bitmap Index Scan hiệu quả hơn.

-- bai 12
SELECT *
FROM product
ORDER BY price DESC
LIMIT 100;
EXPLAIN ANALYZE
SELECT *
FROM product
ORDER BY price DESC
LIMIT 100;
CREATE INDEX idx_product_price_desc ON product (price DESC);
EXPLAIN ANALYZE
SELECT *
FROM product
ORDER BY price DESC
LIMIT 100;
-- Phân tích cách sắp xếp: Ban đầu dùng Sort node, chậm. Sau index, dùng Index Scan, bỏ qua Sort, tăng tốc.

-- bai 13
SELECT category, price
FROM product;
EXPLAIN
SELECT category, price
FROM product;
CREATE INDEX idx_product_category_price ON product (category, price);
EXPLAIN
SELECT category, price
FROM product;
-- Lợi ích của Index Only Scan: Index chứa cả category và price, đọc trực tiếp từ index, không cần truy cập bảng, giảm I/O.

-- bai 14
SELECT p.category, SUM(oi.total_price) as total_sales
FROM order_item oi
         JOIN product p ON oi.product_id = p.product_id
GROUP BY p.category;
EXPLAIN ANALYZE
SELECT p.category, SUM(oi.total_price) as total_sales
FROM order_item oi
         JOIN product p ON oi.product_id = p.product_id
GROUP BY p.category;
CREATE INDEX idx_order_item_product_id ON order_item (product_id);
CREATE INDEX idx_product_category ON product (category);
EXPLAIN ANALYZE
SELECT p.category, SUM(oi.total_price) as total_sales
FROM order_item oi
         JOIN product p ON oi.product_id = p.product_id
GROUP BY p.category;
-- Phân tích GROUP BY: Ban đầu dùng HashAggregate, sau index trên product_id và category, dùng Index Scan, cải thiện JOIN và GROUP BY.

-- bai 15
SELECT *
FROM "order"
WHERE status = 'Shipped'
  AND payment_method = 'Credit Card'
  AND total_amount > 1000;
EXPLAIN ANALYZE
SELECT *
FROM "order"
WHERE status = 'Shipped'
  AND payment_method = 'Credit Card'
  AND total_amount > 1000;
CREATE INDEX idx_order_complex ON "order" (status, payment_method, total_amount);
EXPLAIN ANALYZE
SELECT *
FROM "order"
WHERE status = 'Shipped'
  AND payment_method = 'Credit Card'
  AND total_amount > 1000;
-- Phân tích loại scan: Ban đầu dùng Sequential Scan, sau composite index, dùng Index Scan, cải thiện hiệu suất cho điều kiện phức tạp.

-- bai 16
CREATE INDEX idx_product_category ON product (category);
SELECT *
FROM product
WHERE category IN ('Electronics', 'Clothing');
EXPLAIN
SELECT *
FROM product
WHERE category IN ('Electronics', 'Clothing');
-- Phân tích Bitmap Index Scan và Bitmap Heap Scan: Bitmap Index Scan tạo bitmap từ index cho các category, Bitmap Heap Scan dùng bitmap để truy xuất hàng từ bảng.

-- bai 17
SELECT *
FROM "order"
ORDER BY order_date DESC
LIMIT 20;
EXPLAIN ANALYZE
SELECT *
FROM "order"
ORDER BY order_date DESC
LIMIT 20;
CREATE INDEX idx_order_date_desc ON "order" (order_date DESC);
EXPLAIN ANALYZE
SELECT *
FROM "order"
ORDER BY order_date DESC
LIMIT 20;
-- Phân tích truy vấn LIMIT: Ban đầu dùng Sort node, sau index trên order_date DESC, dùng Index Scan, bỏ qua Sort, tăng tốc.

-- bai 18
SELECT c.customer_id, c.first_name, c.last_name
FROM customer c
WHERE c.customer_id = (SELECT customer_id FROM "order" WHERE total_amount = (SELECT MAX(total_amount) FROM "order"));
EXPLAIN ANALYZE
SELECT c.customer_id, c.first_name, c.last_name
FROM customer c
WHERE c.customer_id = (SELECT customer_id FROM "order" WHERE total_amount = (SELECT MAX(total_amount) FROM "order"));
CREATE INDEX idx_order_total_amount ON "order" (total_amount);
EXPLAIN ANALYZE
SELECT c.customer_id, c.first_name, c.last_name
FROM customer c
WHERE c.customer_id = (SELECT customer_id FROM "order" WHERE total_amount = (SELECT MAX(total_amount) FROM "order"));
-- Phân tích subquery: Ban đầu subquery quét toàn bảng, sau index trên total_amount, dùng Index Scan cho MAX, cải thiện hiệu suất.