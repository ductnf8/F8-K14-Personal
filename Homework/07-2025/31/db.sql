-- Mô tả nội dung bài tập: Thực hành sequence, primary key (pk), join, left join, right join với cơ sở dữ liệu PostgreSQL
--
-- Yều cầu :
--
-- 1. Tạo cơ sở dữ liệu mới có tên là hotel_management.
CREATE DATABASE hotel_management;

-- 2. Tạo bảng guests với các trường sau:
-- guest_id (khóa chính, mã tự tăng)
-- first_name
-- last_name
-- email
-- phone
-- address
-- date_of_birth
-- nationality
-- created_at
CREATE TABLE IF NOT EXISTS guests
(
    guest_id       SERIAL PRIMARY KEY,
    first_name     VARCHAR(100) NOT NULL,
    last_name      VARCHAR(100) NOT NULL,
    email          VARCHAR(255) UNIQUE,
    phone          VARCHAR(20),
    address        TEXT,
    date_of_birth  DATE,
    nationality    VARCHAR(100),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    loyalty_points INTEGER -- yêu cầu số 5
    );

-- 3. Tạo bảng rooms với các trường sau:
--
-- room_id (khóa chính, mã tự tăng)
-- room_number
-- room_type
-- price_per_night
-- max_occupancy
-- is_available
-- floor
-- description
CREATE TABLE IF NOT EXISTS rooms
(
    room_id         SERIAL PRIMARY KEY,
    room_number     VARCHAR(20)    NOT NULL,
    room_type       VARCHAR(50)    NOT NULL,
    price_per_night NUMERIC(10, 2) NOT NULL,
    max_occupancy   INTEGER        NOT NULL CHECK (max_occupancy > 0),
    is_available    BOOLEAN DEFAULT TRUE,
    floor           INTEGER,
    description     TEXT,
    amenities       TEXT[],
    last_updated    TIMESTAMP
    );

-- 4. Tạo bảng bookings với các trường sau:
--
-- booking_id (khóa chính, mã tự tăng)
-- guest_id
-- room_id
-- check_in_date
-- check_out_date
-- total_price
-- booking_status
-- payment_status
-- created_at
CREATE TABLE IF NOT EXISTS bookings
(
    booking_id          SERIAL PRIMARY KEY,
    guest_id            INTEGER REFERENCES guests (guest_id),
    room_id             INTEGER REFERENCES rooms (room_id),
    check_in_date       DATE,
    check_out_date      DATE,
    total_price         NUMERIC(10, 2),
    booking_status      VARCHAR(50),
    payment_status      VARCHAR(50),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    special_requests    TEXT,
    discount_percentage DECIMAL(5, 2)
    );

-- 5. Thêm cột loyalty_points kiểu integer vào bảng guests
ALTER TABLE guests
    ADD COLUMN loyalty_points INTEGER;

-- 6. Thêm cột special_requests kiểu text vào bảng bookings
ALTER TABLE bookings
    ADD COLUMN special_requests TEXT;

-- 7. Thêm cột amenities kiểu text[] (mảng text) vào bảng rooms
ALTER TABLE rooms
    ADD COLUMN amenities TEXT[];

-- 8. Thêm cột last_updated kiểu timestamp vào bảng rooms
ALTER TABLE rooms
    ADD COLUMN last_updated TIMESTAMP;

-- 9. Thêm cột discount_percentage kiểu decimal(5,2) vào bảng bookings
ALTER TABLE bookings
    ADD COLUMN discount_percentage DECIMAL(5, 2);

-- 10. Viết truy vấn INSERT để thêm 5 khách hàng mới vào bảng guests.
--
--                       INSERT INTO guests (guest_id, first_name, last_name, email, phone, address, date_of_birth, nationality, created_at)
-- VALUES
--     (nextval('guest_id_seq'), 'MinMin', 'Nguyen', 'minminnyen@email.com', '0123456789', '123 Tran Duy Hung, Ha Noi', '2002-03-15', 'VN', CURRENT_TIMESTAMP),
INSERT INTO guests (first_name, last_name, email, phone, address, date_of_birth, nationality, created_at,
                    loyalty_points)
VALUES ('MinMin', 'Nguyen', 'minminnyen@email.com', '0123456789', '123 Tran Duy Hung, Ha Noi', '2002-03-15', 'VN',
        CURRENT_TIMESTAMP, 120),
       ('Long', 'Tran', 'longtran@example.com', '0987654321', '456 Le Duan, Da Nang', '1995-08-22', 'VN',
        CURRENT_TIMESTAMP, 200),
       ('Mai', 'Pham', 'maipham@example.com', '0934567890', '789 Nguyen Hue, HCMC', '1998-12-05', 'VN',
        CURRENT_TIMESTAMP, 80),
       ('Khoa', 'Le', 'khoale@example.com', '0912345678', '12 Bach Dang, Hue', '1990-04-18', 'VN', CURRENT_TIMESTAMP,
        150),
       ('Linh', 'Do', 'linhdo@example.com', '0977777777', '99 Ton Duc Thang, HCMC', '2000-10-10', 'VN',
        CURRENT_TIMESTAMP, 300);

--     11. Viết truy vấn INSERT để thêm 10 phòng mới vào bảng rooms.
--
--                           INSERT INTO rooms (room_id, room_number, room_type, price_per_night, max_occupancy, is_available, floor, description)
-- VALUES
--     (nextval('room_id_seq'), '101', 'standard', 89.99, 2, true, 1, 'Comfortable standard room with queen bed'),
INSERT INTO rooms (room_number, room_type, price_per_night, max_occupancy, is_available, floor, description, amenities,
                   last_updated)
VALUES ('101', 'standard', 89.99, 2, TRUE, 1, 'Comfortable standard room with queen bed', ARRAY ['Wi-Fi', 'TV'],
        CURRENT_TIMESTAMP),
       ('102', 'standard', 85.00, 2, TRUE, 1, 'Standard room with twin beds', ARRAY ['Wi-Fi'], CURRENT_TIMESTAMP),
       ('201', 'deluxe', 120.00, 3, TRUE, 2, 'Spacious deluxe room with city view', ARRAY ['Wi-Fi', 'TV', 'Minibar'],
        CURRENT_TIMESTAMP),
       ('202', 'deluxe', 115.50, 3, TRUE, 2, 'Deluxe room with balcony', ARRAY ['Wi-Fi', 'Balcony'], CURRENT_TIMESTAMP),
       ('301', 'suite', 199.99, 4, TRUE, 3, 'Luxury suite with living area',
        ARRAY ['Wi-Fi', 'TV', 'Bathtub', 'Coffee maker'], CURRENT_TIMESTAMP),
       ('302', 'suite', 210.00, 4, TRUE, 3, 'Presidential suite with premium amenities',
        ARRAY ['Wi-Fi', 'Jacuzzi', 'Balcony'], CURRENT_TIMESTAMP),
       ('103', 'standard', 90.00, 2, FALSE, 1, 'Standard room under maintenance', NULL, CURRENT_TIMESTAMP),
       ('203', 'deluxe', 130.00, 3, TRUE, 2, 'Deluxe room with ocean view', ARRAY ['Wi-Fi', 'Ocean view'],
        CURRENT_TIMESTAMP),
       ('303', 'suite', 220.00, 4, TRUE, 3, 'Executive suite with workspace', ARRAY ['Wi-Fi', 'Work desk'],
        CURRENT_TIMESTAMP),
       ('104', 'standard', 80.00, 2, TRUE, 1, 'Compact budget room', ARRAY ['Fan'], CURRENT_TIMESTAMP);

--     12. Viết truy vấn INSERT để thêm 8 đặt phòng mới vào bảng bookings.
--
--                           INSERT INTO bookings (booking_id, guest_id, room_id, check_in_date, check_out_date, total_price, booking_status, payment_status, created_at)
-- VALUES
--     (nextval('booking_id_seq'), 1, 1, '2023-07-15', '2023-07-18', 269.97, 'completed', 'paid', '2023-06-20 10:30:00'),
INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date, total_price, booking_status, payment_status,
                      created_at, special_requests, discount_percentage)
VALUES (1, 1, '2023-07-15', '2023-07-18', 269.97, 'completed', 'paid', '2023-06-20 10:30:00', 'Extra pillows', 0),
       (2, 2, '2023-08-01', '2023-08-05', 340.00, 'confirmed', 'pending', '2023-07-20 14:00:00', NULL, 10.00),
       (3, 3, '2023-08-10', '2023-08-12', 240.00, 'checked_in', 'paid', '2023-08-01 11:15:00', 'Late check-in', 5.00),
       (4, 4, '2023-08-20', '2023-08-22', 231.00, 'cancelled', 'refunded', '2023-08-15 09:00:00', NULL, NULL),
       (5, 5, '2023-09-01', '2023-09-04', 599.97, 'completed', 'paid', '2023-08-25 13:45:00', 'Sea view room', 0),
       (1, 6, '2023-10-10', '2023-10-15', 1050.00, 'confirmed', 'pending', '2023-10-01 08:20:00', NULL, 15.00),
       (2, 7, '2023-11-05', '2023-11-10', 450.00, 'checked_in', 'paid', '2023-11-01 10:10:00', 'Vegan breakfast', 0),
       (3, 8, '2023-12-01', '2023-12-03', 390.00, 'confirmed', 'unpaid', '2023-11-25 17:00:00', 'Early check-in',
        20.00);

--     13. Viết truy vấn SELECT để lấy tất cả thông tin từ bảng guests.
SELECT *
FROM guests;

-- 14. Viết truy vấn SELECT để lấy danh sách các phòng có giá dưới 100 USD một đêm.
SELECT *
FROM rooms
WHERE price_per_night < 100;

-- 15. Viết truy vấn SELECT để lấy danh sách đặt phòng có trạng thái là 'confirmed' hoặc 'checked_in'.
SELECT *
FROM bookings
WHERE booking_status IN ('confirmed', 'checked_in');

-- 16. Viết truy vấn INNER JOIN để lấy thông tin về tất cả các đặt phòng cùng với thông tin khách hàng tương ứng.
SELECT b.booking_id,
       b.check_in_date,
       b.check_out_date,
       b.total_price,
       b.booking_status,
       b.payment_status,
       g.guest_id,
       g.first_name,
       g.last_name,
       g.email
FROM bookings b
         INNER JOIN guests g ON b.guest_id = g.guest_id;

-- 17. Viết truy vấn INNER JOIN để lấy thông tin về tất cả các đặt phòng cùng với thông tin phòng tương ứng.
SELECT b.booking_id,
       b.check_in_date,
       b.check_out_date,
       b.total_price,
       b.booking_status,
       r.room_id,
       r.room_number,
       r.room_type,
       r.price_per_night
FROM bookings b
         INNER JOIN rooms r ON b.room_id = r.room_id;

-- 18. Viết truy vấn INNER JOIN kết hợp cả ba bảng bookings, guests, và rooms để hiển thị thông tin đầy đủ về các đặt phòng.
SELECT b.booking_id,
       b.check_in_date,
       b.check_out_date,
       b.total_price,
       b.booking_status,
       b.payment_status,
       g.first_name || ' ' || g.last_name AS guest_name,
       g.email,
       r.room_number,
       r.room_type,
       r.price_per_night
FROM bookings b
         INNER JOIN guests g ON b.guest_id = g.guest_id
         INNER JOIN rooms r ON b.room_id = r.room_id;

-- 19. Viết truy vấn LEFT JOIN giữa bảng guests và bookings để lấy tất cả khách hàng và thông tin đặt phòng của họ (nếu có).
SELECT g.guest_id,
       g.first_name,
       g.last_name,
       b.booking_id,
       b.check_in_date,
       b.booking_status
FROM guests g
         LEFT JOIN bookings b ON g.guest_id = b.guest_id;

-- 20. Viết truy vấn LEFT JOIN giữa bảng rooms và bookings để lấy tất cả các phòng và thông tin đặt phòng của chúng (nếu có).
SELECT r.room_id,
       r.room_number,
       r.room_type,
       b.booking_id,
       b.check_in_date,
       b.booking_status
FROM rooms r
         LEFT JOIN bookings b ON r.room_id = b.room_id;

-- 21. Viết truy vấn RIGHT JOIN giữa bảng bookings và guests để lấy tất cả các đặt phòng và thông tin khách hàng tương ứng.
SELECT b.booking_id,
       b.check_in_date,
       b.booking_status,
       g.guest_id,
       g.first_name,
       g.last_name
FROM bookings b
         RIGHT JOIN guests g ON b.guest_id = g.guest_id;

-- 22. Viết truy vấn RIGHT JOIN giữa bảng bookings và rooms để lấy tất cả các đặt phòng và thông tin phòng tương ứng.
SELECT b.booking_id,
       b.check_in_date,
       b.booking_status,
       r.room_id,
       r.room_number,
       r.room_type
FROM bookings b
         RIGHT JOIN rooms r ON b.room_id = r.room_id;

-- 23. Viết truy vấn LEFT JOIN giữa bảng guests và bookings để tìm khách hàng chưa từng đặt phòng (sử dụng điều kiện WHERE booking_id IS NULL).
SELECT g.guest_id,
       g.first_name,
       g.last_name
FROM guests g
         LEFT JOIN bookings b ON g.guest_id = b.guest_id
WHERE b.booking_id IS NULL;

-- 24. Viết truy vấn LEFT JOIN giữa bảng rooms và bookings để tìm phòng chưa từng được đặt (sử dụng điều kiện WHERE booking_id IS NULL).
SELECT r.room_id,
       r.room_number,
       r.room_type
FROM rooms r
         LEFT JOIN bookings b ON r.room_id = b.room_id
WHERE b.booking_id IS NULL;

-- 25. Viết truy vấn INNER JOIN giữa bảng guests và bookings để tìm khách hàng đã đặt phòng trong tháng hiện tại.
SELECT g.guest_id,
       g.first_name,
       g.last_name,
       b.booking_id,
       b.check_in_date
FROM guests g
         INNER JOIN bookings b ON g.guest_id = b.guest_id
WHERE DATE_PART('month', b.check_in_date) = DATE_PART('month', CURRENT_DATE)
  AND DATE_PART('year', b.check_in_date) = DATE_PART('year', CURRENT_DATE);

-- 26. Viết truy vấn INNER JOIN giữa bảng rooms và bookings để tìm các phòng đã được đặt trong tuần hiện tại.
SELECT r.room_id,
       r.room_number,
       b.booking_id,
       b.check_in_date
FROM rooms r
         INNER JOIN bookings b ON r.room_id = b.room_id
WHERE DATE_PART('week', b.check_in_date) = DATE_PART('week', CURRENT_DATE)
  AND DATE_PART('year', b.check_in_date) = DATE_PART('year', CURRENT_DATE);

-- 27. Viết truy vấn LEFT JOIN giữa bảng guests và bookings kết hợp với điều kiện WHERE để tìm khách hàng đã đặt phòng nhiều hơn 2 lần.
SELECT g.guest_id,
       g.first_name,
       g.last_name,
       COUNT(b.booking_id) AS total_bookings
FROM guests g
         LEFT JOIN bookings b ON g.guest_id = b.guest_id
GROUP BY g.guest_id, g.first_name, g.last_name
HAVING COUNT(b.booking_id) > 2;

--     28. Viết truy vấn RIGHT JOIN giữa bảng rooms và bookings kết hợp với điều kiện WHERE để tìm các phòng có giá trên 200 USD và đã được đặt ít nhất một lần.
SELECT r.room_id,
       r.room_number,
       r.price_per_night,
       COUNT(b.booking_id) AS times_booked
FROM rooms r
         RIGHT JOIN bookings b ON r.room_id = b.room_id
WHERE r.price_per_night > 200
GROUP BY r.room_id, r.room_number, r.price_per_night;
