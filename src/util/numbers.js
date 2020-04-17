export class NumberUtil 
{
    static toCommaDelim(number, minimumFractionDigits)
    {
        const _defaultValue = 'NAN'
        if(typeof number==='number')
            return number.toLocaleString('en-US', { minimumFractionDigits }) || _defaultValue
        return _defaultValue
    }
}