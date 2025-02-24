# AGV Robot Electron Uygulaması

Bu proje, AGV (Automated Guided Vehicle) robotu üzerinde çalışacak olan bir Electron uygulamasıdır.

## Kurulum

Uygulama **AppImage** formatında paketlenmiştir ve çalıştırılabilmesi için **FUSE** gereklidir. Lütfen aşağıdaki bağlantıyı inceleyerek sisteminizde FUSE'un kurulu olduğundan emin olun:

[FUSE Kurulumu ve Kullanımı](https://github.com/appimage/appimagekit/wiki/fuse)

## Kullanım

Uygulamayı aşağıdaki komut ile başlatabilirsiniz:

```sh
./agv-robot-appimage --no-sandbox
```

⚠ **Dikkat:** Uygulamanın sorunsuz çalışması için `--no-sandbox` parametresi ile çalıştırılması gerekmektedir.

## Derleme

Projeyi derlemek için aşağıdaki komutu kullanabilirsiniz:

```sh
npm run build
```

## Gereksinimler

- Node.js
- Electron
- FUSE

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

