
    public function store(DishRequest $request)
    {
        DB::beginTransaction();
        $requestData = $request->validated();
        $dish = Dish::create([
            'restaurant_id' => $requestData['restaurant_id'],
            'name' => $requestData['name'],
            'price' => $requestData['price'],
            'description' => $requestData['description'],
        ]);
        try {
            foreach ($requestData['imageUrl'] as $url) {
                dish_image::create([
                    'dish_id' => $dish->id,
                    'image_url' => $url,
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => '画像の保存に失敗しました。'], 500);
        }
        DB::commit();
        return response()->noContent(202);
    }
use Illuminate\Http\Request;
use App\Models\Shop;

class DishController extends Controller
{
    public function getDishesByShop(Request $request)
    {
        $id = $request->query('id');
        $shop = Shop::with('dishes')->findOrFail($id);
        $dishNames = $shop->dishes->pluck('name');
        return response()->json($dishNames);
    }
}