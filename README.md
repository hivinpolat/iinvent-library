# iinvent-library

Bu proje, kullanıcıların kitapları ödünç alabileceği bir kütüphane yönetim sistemini temsil eder.

## Kurulum

1. Projeyi klonlayın:

   ```bash
   git clone https://github.com/kullanici/iinvent-library.git
    ``` 
2. Gerekli bağımlılıkları yüklemek için:

   ```bash
   cd iinvent-library
   npm install
   ```
3. .env dosyasını oluşturun ve içine PostgreSQL veritabanı bağlantı URL'sini ekleyin:

   ```bash
   DATABASE_URL=postgresql://kullanici:parola@localhost:5432/kutuphane
   ```
4. Veritabanını oluşturmak için:

   ```bash
    npm prisma migrate dev
    ```

## Kurulum

Proje, Node.js ve Express kullanılarak geliştirilmiştir. Projeyi başlatmak için aşağıdaki komutu kullanabilirsiniz:

```bash  
npm run dev
```

## API Endpoints

API belgelerine erişmek için Swagger kullanılmıştır. Uygulama çalıştığında http://localhost:3000/api-docs adresine
giderek belgelere erişebilirsiniz.