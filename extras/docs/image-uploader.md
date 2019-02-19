# Upload images

To Upload images, you must specify an endpoint to which the image has to be uploaded. The [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request sent is a [FORMDATA](https://developer.mozilla.org/en-US/docs/Web/API/FormData) with name `file`.

To have a custom method which is called on image upload event, you can specify the `uploadImage` event.

## Input

The Input for the endpoint is a string can be provided directly or via `config` property

```html
<app-ngx-editor imageEndPoint="http://myApiEndPoint"></app-ngx-editor>
```

## Response

The Response is a `json` and it should be in the following format

```json
{
    "url": "https://location-of-image"
}
```

## Custom method

```html
<app-ngx-editor (uploadImage)="myCustomFunction($event)"></app-ngx-editor>
```

If both input and the custom method are provided, only the input will be used.
