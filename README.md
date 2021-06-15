# Deta
An unofficial Deta.sh API client for Deno

## Supported services
* Base

## Usage
### Creating a new client
You can find your credentials in your Deta projects settings.
```typescript
import Deta from "https://deno.land/x/deta/mod.ts";

const deta = new Deta({
    projectId: "DETA_IS",
    projectKey: "VERY_COOL",
});
```

### Using Base
```typescript
const base = new deta.Base("users");
```

#### Supported functions
* get
* query
* delete
* update
* insert