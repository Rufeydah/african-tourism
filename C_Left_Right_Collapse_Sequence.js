def process_case(n, m, a, s):
    MOD = m
    l, r = 0, n - 1
    result = []
    
    for command in s:
        if l > r:
            break
        
        # Compute product of a[l:r+1]
        product = 1
        for i in range(l, r + 1):
            product = (product * a[i]) % MOD
        result.append(product)
        
        # Update window
        if command == 'L':
            l += 1
        else:
            r -= 1
    
    return result

def main():
    t = int(input())
    results = []
    for _ in range(t):
        n, m = map(int, input().split())
        a = list(map(int, input().split()))
        s = input().strip()
        res = process_case(n, m, a, s)
        results.append(" ".join(map(str, res)))
    
    print("\n".join(results))

if __name__ == "__main__":
    main()