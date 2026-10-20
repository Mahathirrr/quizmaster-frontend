# Frontend structure

```
src/
  api/               HTTP client and API types (`index.ts`)
  lib/               Shared utilities, dev mocks, api barrel re-export
  stores/            Pinia (auth)
  router/            Vue Router, guards, route modules
  views/
    landing/         Public marketing (LandingPage)
    auth/            Login, register
    admin/           Guru dashboard pages
    student/         Siswa dashboard pages
    shared/          Cross-role pages (Profile)
  components/
    brand/           QuizMaster branding
    layout/          Shells and layouts
    ui/              shadcn-vue primitives
  assets/            Static styles and brand files
```

Data flow: **view → store / api → backend**
