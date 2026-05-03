export function ImageUploadOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div 
    className="relative w-64 h-64 rounded-full overflow-hidden">
      

      {children}

      <div className="absolute inset-0 backdrop-blur-sm bg-white/1 hover:bg-white/20 tranistion-colors 
      duration-300 flex items-center justify-center">
        <i className="fa-regular fa-camera text-4xl text-white"></i>
      </div>

    </div>
  );
}