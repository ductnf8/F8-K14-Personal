-- Bai 1
create table if not exists Book
(
    book_id      int,
    title        varchar(200),
    author       varchar(100),
    publish_year int,
    publisher    varchar(100),
    category     varchar(50),
    page_count   int,
    price        numeric(10, 2),
    stock        int,
    import_date  date
    );
-- Bai 2
alter table Book
    add column status         varchar(20),
    add column language       varchar(30),
    add column shelf_position varchar(20);

-- Bai 3
INSERT INTO Book
VALUES (1, 'The Adventures of Cricket', 'To Hoai', 2010, 'Kim Dong', 'Literature', 150, 75000.00, 10, '2020-01-15',
        'Available', 'Vietnamese', 'A1'),
       (2, 'The Alchemist', 'Paulo Coelho', 2013, 'NXB Tre', 'Novel', 228, 85000.00, 7, '2020-02-20', 'Available',
        'Vietnamese', 'A2'),
       (3, 'How to Win Friends', 'Dale Carnegie', 2016, 'NXB Tong Hop', 'Psychology', 320, 120000.00, 5, '2020-03-10',
        'Borrowed', 'Vietnamese', 'B1'),
       (4, 'Mat biec', 'Nguyen Nhat Anh', 2019, 'NXB Tre', 'Novel', 195, 88000.00, 12, '2020-12-10', 'Available',
        'Vietnamese', 'A4'),
       (5, 'Basic Physics', 'David Halliday', 2014, 'Vietnam National University Press', 'Textbook', 850, 320000.00, 3,
        '2021-01-20', 'Available', 'Vietnamese', 'F1'),
       (6, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1998, 'Gallimard', 'Novel', 120, 150000.00, 0, '2021-02-15',
        'Removed', 'French', 'B3'),
       (7, 'Blockchain Basics', 'Satoshi Nakamoto', 2021, 'TechPress', 'Technology', 320, 220000.00, 5, '2021-03-10',
        'Available', 'English', 'D3'),
       (8, 'Thinking, Fast and Slow', 'Daniel Kahneman', 2011, 'Farrar', 'Psychology', 499, 180000.00, 8, '2022-04-01',
        'Available', 'English', 'C2'),
       (9, 'Sapiens', 'Yuval Noah Harari', 2015, 'Harper', 'History', 443, 210000.00, 4, '2022-05-12', 'Borrowed',
        'English', 'C3'),
       (10, 'Clean Code', 'Robert C. Martin', 2008, 'Prentice Hall', 'Programming', 464, 260000.00, 2, '2022-06-22',
        'Available', 'English', 'D1'),
       (11, 'Atomic Habits', 'James Clear', 2018, 'NXB Tre', 'Self-help', 320, 195000.00, 6, '2022-07-18', 'Borrowed',
        'Vietnamese', 'A5'),
       (12, 'Deep Work', 'Cal Newport', 2016, 'Grand Central', 'Self-help', 296, 175000.00, 9, '2022-08-09',
        'Available', 'English', 'B4'),
       (13, '1984', 'George Orwell', 1949, 'Secker & Warburg', 'Dystopian', 328, 140000.00, 1, '2022-09-30', 'Borrowed',
        'English', 'E2'),
       (14, 'Lập trình Python', 'Nguyễn Văn A', 2020, 'NXB Khoa học', 'Programming', 350, 185000.00, 5, '2022-10-20',
        'Available', 'Vietnamese', 'D5'),
       (15, 'Tư duy nhanh và chậm', 'Daniel Kahneman', 2019, 'NXB Trẻ', 'Tâm lý học', 499, 185000.00, 0, '2023-01-11',
        'Removed', 'Vietnamese', 'C1');

-- Bai 4
-- ****- Hiển thị tất cả thông tin các cuốn sách trong thư viện.
select *
from Book;

-- Hiển thị book_id, title, author của tất cả sách.
select book_id, title, author
from Book;

-- Hiển thị thông tin các sách xuất bản năm 2020.
select *
from Book
where publish_year = 2020;

-- Hiển thị thông tin các sách có price > 200,000.
select *
from Book
where price > 200000;
-- Hiển thị thông tin các sách có stock > 5.
select *
from Book
where stock > 5;

-- Hiển thị thông tin các sách thuộc category = 'Novel'.
select *
from Book
where category = 'Novel';

-- Hiển thị thông tin các sách có status = 'Borrowed'.
select *
from Book
where status = 'Borrowed';

-- Hiển thị thông tin các sách có language = 'English'.
select *
from Book
where language = 'English';

-- Hiển thị thông tin các sách xuất bản trước năm 2000.
select *
from Book
where publish_year < 2000;

-- Hiển thị thông tin các sách có page_count > 300.
select *
from Book
where page_count > 300;

-- Hiển thị thông tin các sách thuộc category = 'Science' và price < 150,000.
select *
from Book
where category = 'Science'
  and price < 150000;

-- Hiển thị thông tin các sách xuất bản từ 2015 đến 2022.
select *
from Book
where publish_year between 2015 and 2022;

-- Hiển thị thông tin các sách có status = 'Available' và stock < 3.
SELECT *
FROM Book
WHERE status = 'Available'
  AND stock < 3;

-- Hiển thị thông tin các sách của author = 'Nguyen Nhat Anh' hoặc 'To Hoai'.
SELECT *
FROM Book
WHERE author IN ('Nguyen Nhat Anh', 'To Hoai');

-- Hiển thị thông tin các sách của publisher = 'Kim Dong' hoặc 'NXB Tre'.
SELECT *
FROM Book
WHERE publisher IN ('Kim Dong', 'NXB Tre');

-- Hiển thị thông tin các sách có language = 'Vietnamese' và page_count < 200.
SELECT *
FROM Book
WHERE language = 'Vietnamese'
  AND page_count < 200;

-- Hiển thị thông tin các sách có category = 'Technology' hoặc 'Science' và xuất bản sau năm 2010.
SELECT *
FROM Book
WHERE (category = 'Technology' OR category = 'Science')
  AND publish_year > 2010;

-- Hiển thị thông tin các sách có shelf_position = 'A1', 'A2' hoặc 'A3'.
SELECT *
FROM Book
WHERE shelf_position IN ('A1', 'A2', 'A3');

-- Hiển thị thông tin các sách có price từ 100,000 đến 300,000 và status = 'Available'.
SELECT *
FROM Book
WHERE price BETWEEN 100000 AND 300000
  AND status = 'Available';

-- Hiển thị thông tin các sách của author = 'Paulo Coelho' hoặc 'Dale Carnegie' và stock > 0.
SELECT *
FROM Book
WHERE author IN ('Paulo Coelho', 'Dale Carnegie')
  AND stock > 0;

-- Cập nhật status thành 'Borrowed' cho sách có book_id = 5.
UPDATE Book
SET status = 'Borrowed'
WHERE book_id = 5;

-- Cập nhật stock thành 0 cho các sách có status = 'Removed'.
UPDATE Book
SET stock = 0
WHERE status = 'Removed';

-- Cập nhật price tăng thêm 10,000 cho tất cả sách thuộc category = 'Novel'.
UPDATE Book
SET price = price + 10000
WHERE category = 'Novel';

-- Cập nhật shelf_position thành 'B5' cho các sách của author = 'Nguyen Nhat Anh'.
UPDATE Book
SET shelf_position = 'B5'
WHERE author = 'Nguyen Nhat Anh';

-- Cập nhật status thành 'Available' cho các sách có status = 'Borrowed' và stock > 5.
UPDATE Book
SET status = 'Available'
WHERE status = 'Borrowed'
  AND stock > 5;

-- Cập nhật language thành 'Vietnamese' cho các sách của publisher = 'Kim Dong' có language là NULL.
UPDATE Book
SET language = 'Vietnamese'
WHERE publisher = 'Kim Dong'
  AND language IS NULL;

-- Cập nhật stock giảm đi 1 cho sách có book_id = 8.
UPDATE Book
SET stock = stock - 1
WHERE book_id = 8;

-- Cập nhật category thành 'Literature' cho các sách có category = 'Novel' và xuất bản trước năm 2000.
UPDATE Book
SET category = 'Literature'
WHERE category = 'Novel'
  AND publish_year < 2000;

-- Cập nhật publisher thành 'NXB Giao Duc' cho các sách của publisher = 'NXB Dai hoc Quoc gia' và thuộc category = 'Textbook'.
UPDATE Book
SET publisher = 'NXB Giao Duc'
WHERE publisher = 'NXB Dai hoc Quoc gia'
  AND category = 'Textbook';

-- Cập nhật page_count thành 0 cho các sách có status = 'Removed' và stock = 0.
UPDATE Book
SET page_count = 0
WHERE status = 'Removed'
  AND stock = 0;
