class binarySearch {

    public int binarySearch2(int[] arr, int target) {
        int s = 0,
            e = arr.length - 1;
        while (s <= e) {
            int mid = s + (e - s) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) s = mid + 1;
            else e = mid - 1;
        }
        return -1;
    }

    public static void main(String args[]) {
        int[] arr = { 2, 3, 5, 9, 10, 12, 15, 18, 20 };
        binarySearch bs = new binarySearch();
        System.out.println(
            "Target is found at index :" + bs.binarySearch2(arr, 10)
        );
    }
}
