ใช้ [Concept Page Object](https://playwright.dev/docs/pom) 

└── 📁configs  // ที่เก็บ config เช่น URL , DB , Credential  
    └── .env.dev 
    └── .env.sit
    └── .env.stg
```
└── 📁fixtures // เก็บพวก testdata expect result, actaul result, locators 
    └── 📁expectedResult
        └── login.page.ts
        └── register.pagets
    └── 📁locators
        └── bank.page.ts
        └── login.page.ts
        └── register.page.ts
```
└── 📁supports  // ที่เขียน function หรือ เขียน test step ต่างๆ 
    └── 📁common
        └── mongo.common.ts
        └── page.common.ts
    └── 📁pages 
        └── bankPage.ts
        └── loginPage.ts
        └── registerPage.ts
```
└── 📁tests // สร้างเทสเคส อาจะเเบ่ง 7 file ตาม senario ที่เขาให้มา 
    └── deposit.spec.ts   
    └── register.spec.ts 
```
└── playwright.config.ts  // config ของ playwright เช่นปรับค่า wait default timeout 
```